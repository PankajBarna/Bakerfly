export const siteConfig = {
  business: {
    name: "Bakerfly",
    tagline: "Premium home bakery • Theme cakes & indulgent desserts",
    type: "Premium/Luxury Home Bakery",
    location: "Thane, Plalva Phase 2",
    serviceArea: "Thane city",
    hours: "11:00 AM – 9:00 PM (Daily)",
    whatsappNumber: "918879878493",
    callNumber: "+91 88798 78493",
    delivery: "Pickup + Delivery within Thane city"
  },
  socials: {
    instagram: "",
    googleMapsLink: ""
  },
  pricing: {
    range: "₹699–₹2,999",
    customStarts: 899,
    tiers: [
      { title: "Custom Cakes", price: "₹899/kg starting", desc: "Classic custom designs, flavors, and fillings." },
      { title: "Premium Themes", price: "₹1,199/kg+", desc: "Theme cakes with elevated detailing & finishes." },
      { title: "Designer / Photo", price: "₹1,499/kg+", desc: "Photo prints, designer-style builds & premium décor." }
    ]
  },
  menu: {
    categories: [
      { id: "theme", name: "Theme Cakes (Best Seller)", sort_order: 1 },
      { id: "regular", name: "Regular Cakes", sort_order: 2 },
      { id: "cheese", name: "Cheesecakes", sort_order: 3 },
      { id: "pastry", name: "Pastries", sort_order: 4 }
    ],
    items: [
      {
        id: "t1",
        category_id: "theme",
        name: "Butterfly Theme Cake",
        price: 1299,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "Elegant butterfly detailing with premium finish.",
        tags: ["best-seller", "premium"],
        minQty: 1,
        step: 0.5,
        featured: true
      },
      {
        id: "t2",
        category_id: "theme",
        name: "Floral Luxe Theme Cake",
        price: 1499,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "Rose-gold accents & floral piping.",
        tags: ["designer"],
        minQty: 1,
        step: 0.5,
        featured: true
      },
      {
        id: "r1",
        category_id: "regular",
        name: "Dutch Chocolate Cake",
        price: 899,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "Rich cocoa sponge with silky ganache.",
        tags: ["classic"],
        minQty: 1,
        step: 0.5,
        featured: false
      },
      {
        id: "c1",
        category_id: "cheese",
        name: "Baked New York Cheesecake",
        price: 999,
        unit: "piece",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "Creamy baked cheesecake with buttery base.",
        tags: ["baked"],
        minQty: 1,
        step: 1,
        featured: true
      },
      {
        id: "p1",
        category_id: "pastry",
        name: "Chocolate Truffle Pastry",
        price: 199,
        unit: "piece",
        image: "https://images.unsplash.com/photo-1614707267537-2c84b8aaef25?auto=format&fit=crop&w=1200&q=80",
        shortDesc: "Soft layers with truffle cream and glaze.",
        tags: ["individual"],
        minQty: 2,
        step: 1,
        featured: false
      }
    ],
    addons: [
      { id: "a1", name: "Cake Topper", price: 149 },
      { id: "a2", name: "Extra Fondant Work", price: 299 },
      { id: "a3", name: "Premium Gift Packaging", price: 199 }
    ]
  }
};
