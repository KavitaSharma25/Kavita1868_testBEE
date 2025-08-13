// test-api.js - Simple test script for the Gaming API
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:4000';
const API_KEY = 'your-secret-api-key-here';

async function testAPI() {
  console.log('🧪 Testing Gaming API...\n');

  try {
    // Test 1: Check if server is running
    console.log('1. Testing server health...');
    const healthResponse = await fetch(`${BASE_URL}/`);
    const healthData = await healthResponse.json();
    console.log('✅ Server is running:', healthData.message);
    console.log('📋 Available endpoints:', JSON.stringify(healthData.endpoints, null, 2));

    // Test 2: Register a user
    console.log('\n2. Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testplayer',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const registerData = await registerResponse.json();
    console.log('📝 Registration result:', registerData.message);

    // Test 3: Login
    console.log('\n3. Testing user login...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginResponse.json();
    console.log('🔐 Login result:', loginData.message);
    if (loginData.user) {
      console.log('👤 User info:', loginData.user);
    }

    // Test 4: Add a score
    console.log('\n4. Testing score submission...');
    const scoreResponse = await fetch(`${BASE_URL}/api/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        playerName: 'testplayer',
        score: 1500
      })
    });
    const scoreData = await scoreResponse.json();
    console.log('🎯 Score submission result:', scoreData.message);

    // Test 5: Get leaderboard
    console.log('\n5. Testing leaderboard...');
    const leaderboardResponse = await fetch(`${BASE_URL}/api/leaderboard`, {
      headers: { 'x-api-key': API_KEY }
    });
    const leaderboardData = await leaderboardResponse.json();
    console.log('🏆 Leaderboard result:', leaderboardData.message);
    if (leaderboardData.data) {
      console.log('📊 Top players:', leaderboardData.data);
    }

    console.log('\n✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Only run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testAPI();
}

export default testAPI;
