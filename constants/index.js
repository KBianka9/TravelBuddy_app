export const hotelItems = [
    {
        id: 1,
        image: require("../src/assets/sardinia.jpg"),
        city: "Cagliari",
        country: "Italy",
        name: "San Teodoro Hotel",
        stars: "4.3",
        price: "126/night",
        map: require("../src/assets/cagliari_map.png"),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur lacinia sapien rhoncus elementum." +
          " Integer commodo scelerisque lectus. Mauris venenatis interdum magna. Mauris vel faucibus mi, at lobortis nisi. Suspendisse potenti." +
          " Pellentesque eu dolor egestas, commodo metus id, pulvinar justo. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
        location: "12",
        hotelListItem: true,
    },
    {
        id: 2,
        image: require("../src/assets/indonesia.jpg"),
        city: "Raha",
        country: "Indonesia",
        name: "Hotel Mutiara",
        stars: "4.5",
        price: "526/night",
        map: require("../src/assets/map.png"),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur lacinia sapien rhoncus elementum." +
          " Integer commodo scelerisque lectus. Mauris venenatis interdum magna. Mauris vel faucibus mi, at lobortis nisi. Suspendisse potenti." +
          " Pellentesque eu dolor egestas, commodo metus id, pulvinar justo. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
        location: "12",
        hotelListItem: false,
    },
    {
        id: 3,
        image: require("../src/assets/hunterrice.jpg"),
        city: "Cebu",
        country: "Indonesia",
        name: "Solea Mactan Resort",
        stars: "4.7",
        price: "396/night",
        map: require("../src/assets/cagliari_map.png"),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur lacinia sapien rhoncus elementum." +
          " Integer commodo scelerisque lectus. Mauris venenatis interdum magna. Mauris vel faucibus mi, at lobortis nisi. Suspendisse potenti." +
          " Pellentesque eu dolor egestas, commodo metus id, pulvinar justo. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
        location: "12",
        hotelListItem: true,
    },
    {
        id: 4,
        image: require("../src/assets/hawaii.jpg"),
        city: "Honolulu",
        country: "Hawaii",
        name: "Moana Surfrider Resort",
        stars: "5.0",
        price: "796/night",
        map: require("../src/assets/cagliari_map.png"),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur lacinia sapien rhoncus elementum." +
          " Integer commodo scelerisque lectus. Mauris venenatis interdum magna. Mauris vel faucibus mi, at lobortis nisi. Suspendisse potenti." +
          " Pellentesque eu dolor egestas, commodo metus id, pulvinar justo. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
        location: "12",
        hotelListItem: false,
    },
    {
        id: 5,
        image: require("../src/assets/indonesia-cover-2.jpg"),
        city: "Kendari",
        country: "Indonesia",
        name: "Hotel Wonua Monapa",
        stars: "4.6",
        price: "126/night",
        map: require("../src/assets/kendari_map.png"),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur lacinia sapien rhoncus elementum." +
          " Integer commodo scelerisque lectus. Mauris venenatis interdum magna. Mauris vel faucibus mi, at lobortis nisi. Suspendisse potenti." +
          " Pellentesque eu dolor egestas, commodo metus id, pulvinar justo. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
        location: "12",
        hotelListItem: true,
    },
];

export const selectedFilterTag = [
    "Essentials",
    "Clothes and shoes",
    "Toiletries",
    "Other",
];

export const fullPackingList = [
    {
        name: "passport",
        packed: 1,
        tags: ["Essentials"],
    },
    {
        name: "cash",
        packed: 0,
        tags: ["Essentials"],
    },
    {
        name: "credit card",
        packed: 1,
        tags: ["Essentials"],
    },
    {
        name: "smart phone and charger",
        packed: 2,
        tags: ["Essentials"],
    },
    {
        name: "health insurance card",
        packed: 1,
        tags: ["Essentials"],
    },
    {
        name: "underwear",
        packed: 5,
        tags: ["Clothes and shoes"],
    },
    {
        name: "pyjamas",
        packed: 1,
        tags: ["Clothes and shoes"],
    },
    {
        name: "T-shirts",
        packed: 6,
        tags: ["Clothes and shoes"],
    },
    {
        name: "shorts",
        packed: 2,
        tags: ["Clothes and shoes"],
    },
    {
        name: "sport shoes",
        packed: 1,
        tags: ["Clothes and shoes"],
    },
    {
        name: "toothbrush",
        packed: 1,
        tags: ["Toiletries"],
    },
    {
        name: "toothpasta",
        packed: 0,
        tags: ["Toiletries"],
    },
    {
        name: "shower gel",
        packed: 1,
        tags: ["Toiletries"],
    },
    {
        name: "shampoo and conditioner",
        packed: 2,
        tags: ["Toiletries"],
    },
    {
        name: "First-aid kit",
        packed: 1,
        tags: ["Toiletries"],
    },
    {
        name: "painkillers",
        packed: 6,
        tags: ["Toiletries"],
    },
    {
        name: "sunglasses",
        packed: 1,
        tags: ["Other"],
    },
    {
        name: "powerbank",
        packed: 2,
        tags: ["Other"],
    },
    {
        name: "books",
        packed: 1,
        tags: ["Other"],
    },
    {
        name: "tissues",
        packed: 6,
        tags: ["Other"],
    },
];
