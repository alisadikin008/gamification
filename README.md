# GAMIFICATION
 
### Usage

  - Install Docker (you may ignore if already installed)
  - Clone this repo (git clone https://github.com/alisadikin008/gamification)
  - CD to gamification(this repo)
  - Create Database ‘gamification’ or you may change as you need
  - Open file gamification/config/config.json (you may edit row as you need)
  - Build Docker image (docker build -t gamification:v1 .) 
  - Run Docker image (docker run -d --name gamification -p 3000:3000 gamification:v1)
  - Open browser or postman 127.0.0.1:3000 or localhost:3000
  
# API DOCUMENTATION
### Customers
    - # Method POST
    - [Host:Port]/v1/customers
    - Payload with raw json type {
	    "firstName":"Nicholas",
	    "lastName":"Anelka",
	    "email":"nicholas@anelka.me",
	    "password":"password",
        "contactNumber":"0812345678",
        "gender":"Male",
        "dateOfBirth":"2021-12-30"
        }
       
    - # Method GET 
    - [Host:Port]/v1/customers
