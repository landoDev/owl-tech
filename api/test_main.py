""" API Integration Tests"""

from fastapi.testclient import TestClient

from main import app 

client = TestClient(app)
def test_api_health():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "I am Groot!"
    }

def test_read_all_stocks():
    response = client.get("/stocks")
    assert response.status_code == 200
    known_assets = ['AmazonCom', 'AlphabetClassC', 'FacebookClassA', 'Apple']    
    assert all(asset in known_assets for asset in response.json().keys())