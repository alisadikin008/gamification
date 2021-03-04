# GAMIFICATION
 
### Usage

  - Install Docker (you may ignore if already installed)
  - Clone this repo (git clone https://github.com/alisadikin008/gamification)
  - CD to gamification(this repo)
  - Create Database ‘gamification’ or you may change as you need
  - Import database gamification.sql (in this repository)
  - Open file gamification/config/config.json (you may edit row as you need)
  - Build Docker image (docker build -t gamification:v1 .) 
  - Run Docker image (docker run -d --name gamification -p 3000:3000 gamification:v1)
  - Open browser or postman 127.0.0.1:3000 or localhost:3000
  - Import postman collection (in this repository)
  
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
    - [Host:Port]/v1/customers/:id
    
### Transactions
    - # Method POST
    - [Host:Port]/v1/transactions
    - Payload with raw json type {
	    "customerId":1,
	    "totalSpent":100,
	    "totalSaving":3.5
        }
       
    - # Method GET 
    - [Host:Port]/v1/transactions
    - [Host:Port]/v1/transactions/:id
    
### Campaigns
    - # Method POST
    - [Host:Port]/v1/campaigns
    - Payload with raw json type {
	    "name":"1st Company Anniversary",
	    "url":"blablabla.com/event/1st-company-anniversary",
	    "closedAt":"2021-04-03 20:31:58" // if this field blank, it means campaign is still running
        }
       
    - # Method GET 
    - [Host:Port]/v1/campaigns
    - [Host:Port]/v1/campaigns/:id
    
### Vouchers
    - # Method POST
    - [Host:Port]/v1/vouchers
    - Payload with raw json type {
	    "campaignId":1,
	    "voucherCode":["ABC123","ABC234","ABC345","ABC..n"],
	    "status":"open"
        }
       
    - # Method GET 
    - [Host:Port]/v1/vouchers
    - [Host:Port]/v1/vouchers/:id
    
    - # Method PUT
    - [Host:Port]/v1/vouchers/:id
    - Payload with raw json type {
	    "status":"locked"
        } 
### Attachment
    - # Method POST
    - [Host:Port]/v1/attachments
    - Payload with raw json type {
	    "file":"selfie_photo_with_product.png",
	    "status":"true",
        }
       
    - # Method GET 
    - [Host:Port]/v1/attachments
    - [Host:Port]/v1/attachments/:id
    
### Campaign-Attachment
    - # Method POST
    - [Host:Port]/v1/campaign-attachments
    - Payload with raw json type {
	    "customerId":1,
	    "campaignId":1,
      "attachmentId":1,
      "voucherId":1
        }
       
    - # Method GET 
    - [Host:Port]/v1/campaign-attachments
    - [Host:Port]/v1/campaign-attachments/:id
    
