const allFurniture = [
  {
    "id": "1",
    "name": "Modern Sofa",
    "description": "A stylish and comfortable modern sofa.",
    "rentalPrice": 449,
    "availabilityStatus": "Available",
    "imageUrl": "https://media.designcafe.com/wp-content/uploads/2021/08/30121959/modern-l-shaped-sectional-set-design-in-living-room.jpg",
    "category": "Living Room",
    "itemType": "Sofa",
    "location": "New York",
    "attributes": {
      "color": "Gray",
      "material": "Fabric",
      "dimensions": "78 x 35 x 34 inches"
    }
  },
  {
    "id": "2",
    "name": "Dining Table Set",
    "description": "Elegant dining table set with six chairs.",
    "rentalPrice": 749,
    "availabilityStatus": "Available",
    "imageUrl": "https://media.istockphoto.com/id/1329937916/photo/scandinavian-domestic-dining-room-interior.jpg?s=612x612&w=0&k=20&c=jblput4MEg7QLUCIffJguBXIg1qYHXrpowBoLuiUasM=",
    "category": "Dining Room",
    "itemType": "Table",
    "location": "San Francisco",
    "attributes": {
      "color": "Brown",
      "material": "Wood",
      "dimensions": "60 x 36 x 30 inches"
    }
  },
  {
    "id": "3",
    "name": "Office Chair",
    "description": "Ergonomic office chair with adjustable height.",
    "rentalPrice": 149,
    "availabilityStatus": "Unavailable",
    "imageUrl": "https://hips.hearstapps.com/edc.h-cdn.co/assets/16/07/1280x640/landscape-1455649044-gettyimages-542092969.jpg?resize=1200:*",
    "category": "Office",
    "itemType": "Chair",
    "location": "Los Angeles",
    "attributes": {
      "color": "Black",
      "material": "Mesh",
      "dimensions": "24 x 24 x 45 inches"
    }
  },
  {
    "id": "4",
    "name": "Queen Bed Frame",
    "description": "Sturdy queen bed frame with a modern design.",
    "rentalPrice": 599,
    "availabilityStatus": "Available",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI3wJqzgIe_pdM5GgErVgcSCD-2Zt3u-8Whg&s",
    "category": "Bedroom",
    "itemType": "Bed",
    "location": "Chicago",
    "attributes": {
      "color": "White",
      "material": "Metal",
      "dimensions": "80 x 60 x 14 inches"
    }
  },
  {
    "id": "5",
    "name": "Bookshelf",
    "description": "Spacious bookshelf with five shelves.",
    "rentalPrice": 199,
    "availabilityStatus": "Available",
    "imageUrl": "https://www.levelofficelandscape.com/wp-content/uploads/2023/02/nuova-libreria-ufficio-level-office-landscape.jpg",
    "category": "Living Room",
    "itemType": "Storage",
    "location": "Houston",
    "attributes": {
      "color": "Brown",
      "material": "Wood",
      "dimensions": "72 x 30 x 12 inches"
    }
  },
  {
    "id": "6",
    "name": "Lounge Chair",
    "description": "Comfortable lounge chair with a sleek design.",
    "rentalPrice": 299,
    "availabilityStatus": "Available",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSECG4cmOBuAQ-cbfThKBy9a0WMwGv4dgxqAQ&s",
    "category": "Living Room",
    "itemType": "Chair",
    "location": "New York",
    "attributes": {
      "color": "Beige",
      "material": "Leather",
      "dimensions": "30 x 34 x 36 inches"
    }
  },
  {
    "id": "7",
    "name": "Extendable Dining Table",
    "description": "Modern extendable dining table with eight chairs.",
    "rentalPrice": 899,
    "availabilityStatus": "Available",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSopQs5FlvfyKlId79gy9EVxkPuknWBm35bw&s",
    "category": "Dining Room",
    "itemType": "Table",
    "location": "San Francisco",
    "attributes": {
      "color": "Gray",
      "material": "Wood",
      "dimensions": "72 x 36 x 30 inches"
    }
  },
  {
    "id": "8",
    "name": "Executive Desk",
    "description": "Stylish executive desk with ample storage.",
    "rentalPrice": 549,
    "availabilityStatus": "Available",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYdzYJQt2W9tq83vijfQtvMFGZJi8ZL7ivXQ&s",
    "category": "Office",
    "itemType": "Desk",
    "location": "Los Angeles",
    "attributes": {
      "color": "Walnut",
      "material": "Wood",
      "dimensions": "60 x 30 x 30 inches"
    }
  },
  {
    "id": "9",
    "name": "King Bed Frame",
    "description": "Luxurious king bed frame with a classic design.",
    "rentalPrice": 799,
    "availabilityStatus": "Available",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgtVXD4ZImCcYpiB-nEN43fwe8KeW5MJbWIA&s",
    "category": "Bedroom",
    "itemType": "Bed",
    "location": "Chicago",
    "attributes": {
      "color": "Dark Brown",
      "material": "Wood",
      "dimensions": "84 x 72 x 15 inches"
    }
  },
  {
    "id": "10",
    "name": "Corner Desk",
    "description": "Space-saving corner desk with built-in shelves.",
    "rentalPrice": 199,
    "availabilityStatus": "Available",
    "imageUrl": "https://m.media-amazon.com/images/I/519mqkIvtBL._SX300_SY300_QL70_FMwebp_.jpg",
    "category": "Office",
    "itemType": "Desk",
    "location": "Houston",
    "attributes": {
      "color": "White",
      "material": "Particle Board",
      "dimensions": "47 x 47 x 30 inches"
    }
  },
  {
    "id": "11",
    "name": "Armchair",
    "description": "Classic armchair with plush cushions.",
    "rentalPrice": 399,
    "availabilityStatus": "Available",
    "imageUrl": "https://cdn.pixabay.com/photo/2015/11/18/15/36/chair-1049325_1280.jpg",
    "category": "Living Room",
    "itemType": "Chair",
    "location": "New York",
    "attributes": {
      "color": "Brown",
      "material": "Leather",
      "dimensions": "32 x 30 x 36 inches"
    }
  },
  {
    "id": "12",
    "name": "Modern Wardrobe",
    "description": "Sleek and spacious wardrobe with sliding doors.",
    "rentalPrice": 699,
    "availabilityStatus": "Available",
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7c2Jrb2iAeBW9TTdwSZaDDFz72R3taV4ew&s",
    "category": "Bedroom",
    "itemType": "Storage",
    "location": "Chicago",
    "attributes": {
      "color": "Gray",
      "material": "Wood",
      "dimensions": "72 x 80 x 24 inches"
    }
  }  
  
  ];

export default allFurniture;
