const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAPIEndpoints() {
    console.log('🧪 Testing EgaPets API Endpoints...');
    console.log(`🌐 Base URL: ${BASE_URL}`);
    
    const tests = [
        {
            name: 'Health Check',
            method: 'GET',
            url: '/health',
            expectedStatus: 200
        },
        {
            name: 'API Info',
            method: 'GET', 
            url: '/api',
            expectedStatus: 200
        },
        {
            name: 'Get All Products',
            method: 'GET',
            url: '/api/products',
            expectedStatus: 200
        },
        {
            name: 'Get All Categories',
            method: 'GET',
            url: '/api/categories',
            expectedStatus: 200
        },
        {
            name: 'Get All Services',
            method: 'GET',
            url: '/api/services',
            expectedStatus: 200
        },
        {
            name: 'Get Payment Methods',
            method: 'GET',
            url: '/api/payment-methods',
            expectedStatus: 200
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
        try {
            console.log(`\n🔍 Testing: ${test.name}`);
            console.log(`   ${test.method} ${test.url}`);
            
            const response = await axios({
                method: test.method,
                url: `${BASE_URL}${test.url}`,
                timeout: 5000
            });
            
            if (response.status === test.expectedStatus) {
                console.log(`   ✅ PASS - Status: ${response.status}`);
                
                // Show some response data
                if (response.data) {
                    if (Array.isArray(response.data)) {
                        console.log(`   📊 Data: Array with ${response.data.length} items`);
                    } else if (typeof response.data === 'object') {
                        console.log(`   📊 Data: Object with keys: ${Object.keys(response.data).join(', ')}`);
                    } else {
                        console.log(`   📊 Data: ${response.data}`);
                    }
                }
                passed++;
            } else {
                console.log(`   ❌ FAIL - Expected: ${test.expectedStatus}, Got: ${response.status}`);
                failed++;
            }
            
        } catch (error) {
            console.log(`   ❌ FAIL - Error: ${error.message}`);
            if (error.response) {
                console.log(`   📋 Status: ${error.response.status}`);
                console.log(`   📋 Data: ${JSON.stringify(error.response.data)}`);
            }
            failed++;
        }
    }
    
    console.log(`\n📊 Test Results:`);
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    
    if (failed === 0) {
        console.log(`\n🎉 All tests passed! EgaPets API is working correctly with PostgreSQL.`);
    } else {
        console.log(`\n⚠️  Some tests failed. Please check the API endpoints.`);
    }
}

// Test user registration and login
async function testUserAuth() {
    console.log('\n🔐 Testing User Authentication...');
    
    try {
        // Test user registration
        console.log('\n1. Testing user registration...');
        const registerData = {
            username: `testuser_${Date.now()}`,
            email: `test_${Date.now()}@example.com`,
            password: 'Test123456',
            ho_ten: 'Test User',
            so_dien_thoai: `0${Math.floor(Math.random() * 1000000000)}`
        };
        
        const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, registerData);
        console.log(`   ✅ Registration successful - Status: ${registerResponse.status}`);
        
        // Test user login
        console.log('\n2. Testing user login...');
        const loginData = {
            username: registerData.username,
            password: registerData.password
        };
        
        const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, loginData);
        console.log(`   ✅ Login successful - Status: ${loginResponse.status}`);
        
        if (loginResponse.data.token) {
            console.log(`   🔑 Token received: ${loginResponse.data.token.substring(0, 20)}...`);
        }
        
    } catch (error) {
        console.log(`   ❌ Auth test failed: ${error.message}`);
        if (error.response) {
            console.log(`   📋 Status: ${error.response.status}`);
            console.log(`   📋 Data: ${JSON.stringify(error.response.data)}`);
        }
    }
}

// Run all tests
async function runAllTests() {
    try {
        await testAPIEndpoints();
        await testUserAuth();
        
        console.log('\n🏁 All tests completed!');
        
    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
    }
}

if (require.main === module) {
    runAllTests();
}

module.exports = { testAPIEndpoints, testUserAuth };