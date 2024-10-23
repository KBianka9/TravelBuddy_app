export const hotelItems = [
    {
        id: 1,
        image: require("../src/assets/sardinia.jpg"),
        city: "Cagliari",
        country: "Italy",
      name: "Palazzo Tirso Cagliari Mgallery",
      stars: "4.8",
      price: "99,99 €/night",
        map: require("../src/assets/cagliari_map.png"),
      description: "The rooms at the accommodation are equipped with air conditioning," +
        " central heating and a bathroom. Most rooms offer sea views. The rooms have a double bed," +
        " a queen size bed or a king size bed. There is also a safe and a bar. A tea/coffee maker is also" +
        " included as standard. A trouser press is also available. A telephone, a TV set, a radio and WiFi are" +
        " also provided for the comfort of guests during their vacation. The rooms also have slippers. The bathroom" +
        " has a shower. The hairdryer and bathrobes in the bathroom provide everyday comfort. As a special feature," +
        " guests will find cosmetics and a selection of towels in the bathrooms. The hotel also has non-smoking rooms.",
      latitude: 39.21175385480126,
      longitude: 9.116005513984648,
        hotelListItem: true,
    },
    {
        id: 2,
        image: require("../src/assets/indonesia.jpg"),
      city: "Longa",
        country: "Indonesia",
      name: "Naya Matahora Island Resort",
      stars: "4.3",
      price: "95.56 €/night",
      map: require("../src/assets/longa_map.png"),
      description: "Naya Matahora Island Resort offers accommodation in Langga. Featuring a garden, this 3-star hotel" +
        " has air-conditioned rooms with a private bathroom. There is free private parking and the property features" +
        " paid airport shuttle service.\n" +
        "At the hotel, rooms have a terrace with a sea view. The rooms will provide guests with a desk and a kettle.",
      latitude: -5.295625705394363,
      longitude: 123.64394485582642,
        hotelListItem: false,
    },
    {
        id: 3,
      image: require("../src/assets/cebu.jpg"),
        city: "Cebu",
      country: "Philippines",
      name: "Nacho Hostel",
      stars: "4.3",
      price: "48.72 €/night",
      map: require("../src/assets/cebu_map.png"),
      description: "Nacho Hostel Cebu has an outdoor swimming pool, garden, a shared lounge and restaurant in Bulacao." +
        " Boasting an ATM, this property also provides guests with a sun terrace. The accommodation features karaoke and a 24-hour front desk." +
        "At the hostel, all rooms are fitted with a desk. At Nacho Hostel Cebu, rooms include air conditioning and a private bathroom." +
        "You can play billiards and table tennis at the accommodation. Colon Street is 7.6 km from Nacho Hostel Cebu, while Magellan's Cross" +
        " is 8.2 km from the property. The nearest airport is Mactan-Cebu International Airport, 19 km from the hostel.",
      latitude: 10.26805068321804,
      longitude: 123.84367457550056,
        hotelListItem: true,
    },
    {
        id: 4,
        image: require("../src/assets/hawaii.jpg"),
        city: "Honolulu",
        country: "Hawaii",
      name: "Ala Moana Hotel",
      stars: "4.1",
      price: "98.68 €/night",
      map: require("../src/assets/honolulu_map.png"),
      description: "With a newly transformed Lobby, Starbucks Lounge, Porte Cochère" +
        " as well as a total modernization of the hotel's pool deck, the new and improved Ala Moana Hotel by Mantra is" +
        " ready to welcome you back in true Hawaiian style. Located between the Hawaii Convention Center and Ala Moana Shopping Center, Ala Moana" +
        " Hotel - Resort Fee Included features 2 restaurants on site. Free WiFi is included in all guest rooms.",
      latitude: 21.292453302567367,
      longitude: -157.83637583287643,
        hotelListItem: false,
    },
    {
        id: 5,
      image: require("../src/assets/SesSalines.jpg"),
      city: "Ses Salines",
      country: "Spain",
      name: "Villa Station",
        stars: "4.6",
      price: "99.12 €/night",
      map: require("../src/assets/SesSalines_map.png"),
      description: "Featuring an outdoor swimming pool and terrace set among tropical plants, Villa Station by Cassai" +
        " is set just outside Ses Salines and 10 minutes’ drive from Es Trenc Beach. The stylish country hotel offers free Wi-Fi." +
        "Spacious, air-conditioned rooms have a charming rustic décor and beds with drapes. They all have private bathrooms, and" +
        " the apartments also come with an equipped kitchenette.",
      latitude: 39.345482691078345,
      longitude: 3.0710287672127428,
      hotelListItem: true,
    },
];

export const destinations = [
  {
    city: "Cagliari",
    latitude: 39.222637310934104,
    longitude: 9.117414925645399,
    name: "Museo archeologico nazionale",
  },
  {
    city: "Cagliari",
    latitude: 39.224249737487334,
    longitude: 9.114260647861565,
    name: "Roman Amphitheatre of Cagliari",
  },
  {
    city: "Cagliari",
    latitude: 39.23109251082099,
    longitude: 9.09635844599624,
    name: "Giostre Wonderland",
  },
  {
    city: "Cagliari",
    latitude: 39.22180520602482,
    longitude: 9.111918881773432,
    name: "Orto Botanico di Cagliari",
  },
  {
    city: "Cagliari",
    latitude: 39.20210858501311,
    longitude: 9.128588980432717,
    name: "Bacan Cagliari",
  },
  {
    city: "Longa",
    latitude: -5.242866876781068,
    longitude: 123.58690030984063,
    name: "Moli'i Sahatu beach",
  },
  {
    city: "Longa",
    latitude: -5.256884061698204,
    longitude: 123.53368528354187,
    name: "Pantai Cemara",
  },
  {
    city: "Longa",
    latitude: -5.36969374364136,
    longitude: 123.59170682982682,
    name: "Masjid Keraton Liya",
  },
  {
    city: "Cebu",
    latitude: 10.24724019015048,
    longitude: 123.83099510408339,
    name: "Crocolandia",
  },
  {
    city: "Cebu",
    latitude: 10.292203156959895,
    longitude: 123.7966221567477,
    name: "Kwasan Falls",
  },
  {
    city: "Cebu",
    latitude: 10.28396493150299,
    longitude: 123.85095127291956,
    name: "Alta Vista Golf & Country Club",
  },
  {
    city: "Cebu",
    latitude: 10.307752059497616,
    longitude: 123.81908297475006,
    name: "Igutan Falls",
  },
  {
    city: "Honolulu",
    latitude: 21.304608514135165,
    longitude: -157.8431564571618,
    name: "Honolulu Museum of Art",
  },
  {
    city: "Honolulu",
    latitude: 21.318281925439123,
    longitude: -157.85654604474624,
    name: "Foster Botanical Garden",
  },
  {
    city: "Honolulu",
    latitude: 21.27365872740736,
    longitude: -157.81998217132602,
    name: "Kuhio Beach",
  },
  {
    city: "Honolulu",
    latitude: 21.28004321901977,
    longitude: -157.82411097870747,
    name: "Marugame Udon",
  },
  {
    city: "Ses Salines",
    latitude: 39.34129515063438,
    longitude: 3.068692214289471,
    name: "Botanicactus S.L.",
  },
  {
    city: "Ses Salines",
    latitude: 39.31573988955712,
    longitude: 3.1206643931707925,
    name: "Caló del Moro",
  },
  {
    city: "Ses Salines",
    latitude: 39.352085714212706,
    longitude: 2.9135561540733734,
    name: "Far de s'Estalella",
  },
  {
    city: "Ses Salines",
    latitude: 39.458212466246714,
    longitude: 3.1956560732463695,
    name: "Sanctuary of Sant Salvador",
  },
];

export const reviewItems = [
  {
    reviewId: 1,
    user: "Arthur Smith",
    email: "arthursmith@gmail.com",
    profilePic: require("../src/assets/profile.png"),
    postDate: "09.09.2020.",
    cityCountry: "Cagliari, Italy",
    text: "We lived in Palazzo Tirso Cagliari Mgallery for 3 days. It was very clean and confortable. \n" +
      "On first day we visited Beach excursion to Chia and Tuerredda. Starting the trip early morning, we got to enjoy Tuerredda at the rare" +
      " hour of peace, when sand was not crowded yet, and the water was just otherwordly. \n" +
      "On second day we spent a few hours in this beautiful botanical garden, Orto Botanico. There was almost without visitors, so it was a quiet, relaxing time for us. We saw lots of" +
      " cacti, palm trees and other tropical plants. We enjoyed it.",
    images: [
      require("../src/assets/Cagliari_1.jpg"),
      require("../src/assets/Cagliari_2.jpg"),
      require("../src/assets/Cagliari_3.jpg"),
    ],
    useful: true,
    usefulSum: 400,
    uselessSum: 2,
    report: false,
  },
  {
    reviewId: 2,
    user: "Jenny Miller",
    email: "jennymiller@gmail.com",
    profilePic: require("../src/assets/corgi.webp"),
    postDate: "18.07.2019.",
    cityCountry: "Cagliari, Italy",
    text: "I spent a few days in Palazzo Tirso Cagliari Mgallery. Due to some strategic parking we left the Botanic" +
      " Gardens, walked past the car and carried on up the hill to the Roman amphitheatre." +
      " We paid the fee, walked down the ramp to the viewing area. \n" +
      "Before we went back to the hotel, we tried a restaurant, Bacàn." +
      "In front of the marina, with a fantastic sunset, music in the background .. well a nice atmosphere. We had cold" +
      " cuts and cheeses, beef fillet and sushi, as well as aperitifs and side dishes.",
    images: [
      require("../src/assets/Cagliari_4.jpg"),
      require("../src/assets/Cagliari_5.jpg"),
      require("../src/assets/Cagliari_7.jpg"),
    ],
    useful: null,
    usefulSum: 250,
    uselessSum: 0,
    report: false,
  },
  {
    reviewId: 3,
    user: "Sarah Mars",
    email: "sarahmars@gmail.com",
    profilePic: require("../src/assets/frenchbulldog1.jpg"),
    postDate: "15.06.2022.",
    cityCountry: "Cagliari, Italy",
    text: "Sardinia has a tremendously rich and loooong history. Museo Archeologico Nazionale provided great context and additional" +
      " detail to all of the sties we had previously visited on our travels" +
      " . It truly helped us untangle and make sense of the competing timelines. The museum is very" +
      " well laid out, with loads of interesting pieces, as well as great dual language interpretive panels (IT & EN).",
    images: [
      require("../src/assets/Cagliari_6.jpg"),
      require("../src/assets/Cagliari_8.jpg"),
      require("../src/assets/Cagliari_9.jpg"),
    ],
    useful: true,
    usefulSum: 126,
    uselessSum: 4,
    report: false,
  },
  {
    reviewId: 4,
    user: "Antonio Vivaldi",
    email: "antoniovivaldi@gmail.com",
    profilePic: require("../src/assets/frenchbulldog2.jpg"),
    postDate: "09.09.2020.",
    cityCountry: "Longa, Indonesia",
    text: "We lived in Naya Matahora Island Resort some days." +
      "The beauty of the beach and enchanting white sand. It is called Moli'i Sahatu beach" +
      " because it has one hundred fresh water springs." +
      "Another beach that we visited was Cemara Sewu Beach. There are a lot of tree here that very handy to visitor during hot/mid day visit. \n" +
      "Next day we went to mosque is one of the oldest mosques in Wakatobi, located right inside the fortress of Liya Palace." +
      " If you're in Wakatobi, it's not good if you haven't been to this place.",
    images: [
      require("../src/assets/Longa_1.jpg"),
      require("../src/assets/Longa_2.jpg"),
      require("../src/assets/Longa_3.jpg"),
      require("../src/assets/Longa_4.jpg"),
    ],
    useful: true,
    usefulSum: 478,
    uselessSum: 1,
    report: true,
  },
  {
    reviewId: 5,
    user: "Mike Smith",
    email: "mikesmith@gmail.com",
    profilePic: require("../src/assets/frenchbulldog.jpg"),
    postDate: "09.09.2020.",
    cityCountry: "Cebu, Philippines",
    text: "The first day program was Alta Vista Golf & Country Club." +
      " The club house is situated up a hill and it had a feel of old time quality about it." +
      " That was the gateway to an amazing place. The views are spectacular and I tried to figure" +
      " out where the golf course was. It's all around you in a protected nature reserve.",
    images: [
      require("../src/assets/Cebu_5.jpg"),
    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
    report: false,
  },
  {
    reviewId: 6,
    user: "Julie Smith",
    email: "juliesmith@gmail.com",
    profilePic: require("../src/assets/frenchbulldog.jpg"),
    postDate: "09.09.2020.",
    cityCountry: "Cebu, Philippines",
    text: "I highly recommended Nacho Hostel, because this place was very nice." +
      "Really enjoyed our visit in Crocolandia. The place is nicely kept and the" +
      " animals all look healthy. Very good and informative display on the biodiversity" +
      " of the Philippines. The snake encounter and crocodile feeding are professionally" +
      " presented by the zoologist. There is also a cafe which is simple but very pleasant to" +
      " sit. Lovely plants and nice gardens." +
      "The following days we went some water falls, Kwasan Falls and Inambakan Falls. Children like" +
      "all moments there.",
    images: [
      require("../src/assets/Cebu_1.jpg"),
      require("../src/assets/Cebu_2.jpg"),
      require("../src/assets/Cebu_3.webp"),
      require("../src/assets/Cebu_4.webp"),
    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
    report: false,
  },
  {
    reviewId: 7,
    user: "David Taylor",
    email: "davidtaylor@gmail.com",
    profilePic: require("../src/assets/frenchbulldog.jpg"),
    postDate: "09.09.2020.",
    cityCountry: "Cebu, Philippines",
    text: "Simala Shrine in Cebu is like stepping into a fairytale! This stunning hilltop castle is surrounded by lush" +
      " greenery and colorful flowers. It's famous for its beautiful statues and grand altar, where many believe miracles" +
      " happen.\n" +
      "Visitors can climb the stairs for breathtaking views, ring the huge bell for good luck, and explore a mini-museum" +
      " filled with fascinating artifacts.",
    images: [
      require("../src/assets/Cebu_6.jpg"),
    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
    report: true,
  },
  {
    reviewId: 8,
    user: "Tom Brown",
    email: "tombrown@gmail.com",
    profilePic: require("../src/assets/frenchbulldog.jpg"),
    postDate: "11.11.2022.",
    cityCountry: "Honolulu, Hawaii",
    text: "Ala Moana Hotel was a fantastic hotel, the room, the staff, everything." +
      "Wonderful art museum, Honolulu Museum of Art, with broad collection of many different genres in beautiful building with court yards," +
      " amazing fresh tropical floral arrangements. Shop and cafe very good as well. \n" +
      "Foster Botanical Garden was beautiful mature gardens with true Hawaiian tropical ambience. So many unique plants and a real bargain. If it is raining they provide" +
      " free umbrellas. Staff were very friendly and gardens are well maintained.",
    images: [
      require("../src/assets/Honolulu_1.jpg"),
      require("../src/assets/Honolulu_2.webp"),
      require("../src/assets/Honolulu_3.jpg"),

    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
    report: false,
  },
  {
    reviewId: 9,
    user: "Carl Jones",
    email: "carljones@gmail.com",
    profilePic: require("../src/assets/frenchbulldog.jpg"),
    postDate: "01.11.2021.",
    cityCountry: "Honolulu, Hawaii",
    text: "Foster Botanical Garden was a beautiful place, I have never been before somthing like this." +
      "The different plant species, simply stunning. But let the pictures speak for themselves.",
    images: [
      require("../src/assets/Honolulu_4.jpg"),
      require("../src/assets/Honolulu_5.jpg"),
      require("../src/assets/Honolulu_6.jpg"),
    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
    report: false,
  },
  {
    reviewId: 10,
    user: "Will Williams",
    email: "willwilliams@gmail.com",
    profilePic: require("../src/assets/frenchbulldog.jpg"),
    postDate: "09.09.2020.",
    cityCountry: "Honolulu, Hawaii",
    text: "Kuhio Beach is picturesque, convenient, safe and a delightful place to spend the day." +
      "This spot is typically super calm and is great for little kids and/or those with limited" +
      " swimming ability. This is in part due to rectangular rock wall jettys that box in swimming" +
      " areas and protect you from the surf break. It also has lifeguards during daytime hours," +
      " rinsing stations and small restrooms.",
    images: [
      require("../src/assets/Honolulu_7.webp"),
      require("../src/assets/Honolulu_8.webp"),
      require("../src/assets/Honolulu_9.webp"),
    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
    report: false,
  },
  {
    reviewId: 11,
    user: "Eva Evans",
    email: "evaevans@gmail.com",
    profilePic: require("../src/assets/frenchbulldog.jpg"),
    postDate: "09.09.2020.",
    cityCountry: "Honolulu, Hawaii",
    text: "Honolulu Zoo is an amazing deal. Price of admission when we visited was $21 each. " +
      "The zoo appears small from the outside but it’s actually layed out for maximum efficiency. The Sumatran tiger, Giraffes were really cool" +
      " as well. \n" +
      "Marukame Udon  makes the noodles right in front of the restaurant through a glass window! Fresh and delicious… that gummy" +
      " slippery texture we all love and just absolutely perfected… CANT GET ENOUGH! Get the tonkatsu pork broth. It’s delish.",
    images: [
      require("../src/assets/Honolulu_10.webp"),
      require("../src/assets/Honolulu_11.webp"),
      require("../src/assets/Honolulu_12.webp"),
      require("../src/assets/Honolulu_13.jpg"),
      require("../src/assets/Honolulu_14.jpg"),
      require("../src/assets/Honolulu_15.jpg"),
    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
    report: false,
  },
  {
    reviewId: 12,
    user: "Bob Brown",
    email: "bobbrown@gmail.com",
    profilePic: require("../src/assets/frenchbulldog.jpg"),
    postDate: "09.09.2020.",
    cityCountry: "Ses Salines, Spain",
    text: "Botanicactus is a fantastic oasis showcasing various cacti and palm trees of the world. A fantastic place to take a stroll " +
      "and even better with a picnic. Well worth the entrance fee to provide such a lovely place. \n" +
      "Beautiful place to visit, Sanctuary of Sant Salvador. Great views and a beautiful small church. There are facilities at the top if needed or picnic tables.\n" +
      "A lovely walk through a preserve to the local lighthouse, Far de s'Estalella.",
    images: [
      require("../src/assets/SesSalines_1.jpg"),
      require("../src/assets/SesSalines_2.jpg"),
      require("../src/assets/SesSalines_3.jpg"),
      require("../src/assets/SesSalines_4.jpg"),
      require("../src/assets/SesSalines_5.jpg"),
    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
    report: false,
  },
];

export const categoryList = [
  {
    name: "Travel",
    color: "#98daca",
    tBudget: "200",
    icon: require("../src/assets/airplane-mode.jpg"),
  },
  {
    name: "Food",
    color: "#539a88",
    tBudget: "550",
    icon: require("../src/assets/food.jpg"),
  },
  {
    name: "Entertainment",
    color: "#aab2be",
    tBudget: "350",
    icon: require("../src/assets/theme-park.jpg"),
  },
  {
    name: "Other",
    color: "#5e646b",
    tBudget: "700",
    icon: require("../src/assets/menu.jpg"),
  },
];

export const itemList = [
  {
    name: "plane ticket",
    category: "Travel",
    cost: "40",
  },
  {
    name: "taxi",
    category: "Travel",
    cost: "10",
  },
  {
    name: "hamburger",
    category: "Food",
    cost: "40",
  },
  {
    name: "pizza",
    category: "Food",
    cost: "25",
  },
  {
    name: "water",
    category: "Food",
    cost: "10",
  },
  {
    name: "cinema",
    category: "Entertainment",
    cost: "15",
  },
  {
    name: "party",
    category: "Entertainment",
    cost: "15",
  },
  {
    name: "golf",
    category: "Entertainment",
    cost: "15",
  },
  {
    name: "cigarette",
    category: "Other",
    cost: "15",
  },
];
