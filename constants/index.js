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

export const reviewItems = [
  {
    reviewId: 1,
    user: "Arthur Smith",
    postDate: "09.09.2020.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur" +
      "lacinia sapien rhoncus elementum. Integer commodo scelerisque lectus. Mauris venenatis interdum" +
      "magna. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
    images: [
      require("../src/assets/indonesia-cover-2.jpg"),
      require("../src/assets/indonesia-cover-3.jpg"),
      require("../src/assets/corgi.webp"),
    ],
    useful: true,
    usefulSum: 400,
    uselessSum: 2,
  },
  {
    reviewId: 2,
    user: "Jenny Miller",
    postDate: "08.09.2019.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur" +
      "lacinia sapien rhoncus elementum. Integer commodo scelerisque lectus. Mauris venenatis interdum" +
      "magna. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
    images: [
      require("../src/assets/indonesia-cover-2.jpg"),
      require("../src/assets/indonesia-cover-3.jpg"),
      require("../src/assets/bucket_list.jpg"),
    ],
    useful: null,
    usefulSum: 250,
    uselessSum: 0,
  },
  {
    reviewId: 3,
    user: "Sarah Mars",
    postDate: "09.09.2020.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur" +
      "lacinia sapien rhoncus elementum. Integer commodo scelerisque lectus. Mauris venenatis interdum" +
      "magna. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
    images: [
      require("../src/assets/indonesia-cover-2.jpg"),
      require("../src/assets/indonesia-cover-3.jpg"),
      require("../src/assets/bucket_list.jpg"),
    ],
    useful: true,
    usefulSum: 126,
    uselessSum: 4,
  },
  {
    reviewId: 4,
    user: "Antonio Banderas",
    postDate: "09.09.2020.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur" +
      "lacinia sapien rhoncus elementum. Integer commodo scelerisque lectus. Mauris venenatis interdum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur" +
      "magna. In quis ornare tellus. Sed in odio et enim vehicula viverra.",
    images: [
      require("../src/assets/indonesia-cover-2.jpg"),
      require("../src/assets/indonesia-cover-3.jpg"),
      require("../src/assets/bucket_list.jpg"),
      require("../src/assets/walkway-tropical-jungle.jpg"),
      require("../src/assets/hawaii.jpg"),
      require("../src/assets/hunterrice.jpg"),
    ],
    useful: true,
    usefulSum: 478,
    uselessSum: 1,
  },
  {
    reviewId: 5,
    user: "Mike Smith",
    postDate: "09.09.2020.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur" +
      "lacinia sapien rhoncus elementum. Integer commodo scelerisque lectus. Mauris venenatis interdum" +
      "magna. In quis ornare tellus. Sed in odio et enim vehicula viverra. vmfjkduhig dfnkrg fgri rgnri grgojr",
    images: [
      require("../src/assets/indonesia-cover-2.jpg"),
      require("../src/assets/indonesia-cover-3.jpg"),
      require("../src/assets/bucket_list.jpg"),
    ],
    useful: true,
    usefulSum: 255,
    uselessSum: 2,
  },
];
