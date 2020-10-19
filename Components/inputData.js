import { turquoise } from "color-name";

const inputData = [
    // these are the key componpnenets that the user will be asked to input information on
    {
      title: "Type of Bread",
      data: ["Regular Loaf", "Sourdough Loaf", "Bagels", "English Muffins"],
    },
    {
      title: "Type of Flour Used",
      data: ["All Purpose Flour", "Bread Flour", "Whole Wheat Flour", "White Whole Wheat Flour"]
    },
    {
      title: "Volume of Ingredients",
      data: ["Flour", "Salt", "Yeast (or Starter)", "Water", "Suger", "Butter", "Eggs", "Milk"]
    },
    {
      title: "Length of Prove",
      data: ["First Prove", "Second Prove"],
    },
    {
      title: "Cooking Method",
      data: ["Kneed Time", "Oven Temperature", "Volume of Water", "Type of Container"],
    },
  ];

  const ingredients = [
    {
        id: 1,
        name: 'All Purpose Flour',
        amount: '',
        units: 'gr',
        isVisible: false,
        type: 'flour',
        ingredient: true,
    },
    {
        id: 2,
        name: 'Bread Flour',
        amount: '',
        units: 'gr',
        isVisible: false,
        type: 'flour',
        ingredient: true,
    },
    {
        id: 3,
        name: 'Whole Wheat Flour',
        amount: '',
        units: 'gr',
        isVisible: false,
        type: 'flour',
        ingredient: true,
    },
    {
        id: 4,
        name: 'White Whole Wheat Flour',
        amount: '',
        units: 'gr',
        isVisible: false,
        type: 'flour',
        ingredient: true,
    },
    {
        id: 5,
        name: 'Salt',
        amount: '',
        units: 'gr',
        isVisible: true,
        ingredient: true,
    },
    {
        id: 6,
        name: 'Yeast (or Starter)',
        amount: '',
        units: 'gr',
        isVisible: true,
        ingredient: true,
    },
    {
        id: 7,
        name: 'Water',
        amount: '',
        units: 'ml',
        isVisible: true,
        ingredient: true,
    },
    {
        id: 8,
        name: 'Sugar',
        amount: '',
        units: 'gr',
        isVisible: true,
        ingredient: true,
    },
    {
        id: 9,
        name: 'Butter',
        amount: '',
        units: 'gr',
        isVisible: true,
        ingredient: true,
    },
    {
        id: 10,
        name: 'Oil',
        amount: '',
        units: 'ml',
        isVisible: true,
        ingredient: true,
    },
    {
        id: 11,
        name: 'Eggs',
        amount: '',
        units: 'eggs',
        isVisible: true,
        ingredient: true,
    },
    {
        id: 12,
        name: 'Milk',
        amount: '',
        units: 'ml',
        isVisible: true,
        ingredient: true,
    },
    {
        id: 13,
        name: 'Regular Loaf',
        isSelected: false,
        type: 'loaf',
        ingredient: false,
    },
    {
        id: 14,
        name: 'Sourdough Loaf',
        isSelected: false,
        type: 'loaf',
        ingredient: false,
    },
    {
        id: 15,
        name: 'Bagel(s)',
        isSelected: false,
        type: 'loaf',
        ingredient: false,
    },
    {
        id: 16,
        name: 'English Muffin(s)',
        isSelected: false,
        type: 'loaf',
        ingredient: false,
    },
    {
        id: 17,
        name: 'First Prove',
        amount: '',
        units: 'hrs',
        isVisible: true,
        type: 'proof'
    },
    {
        id: 18,
        name: 'Second Prove',
        amount: '',
        units: 'hrs',
        isVisible: true,
        type: 'proof'
    },
    {
        id: 19,
        name: 'Kneed Time',
        amount: '',
        units: 'mins',
        isVisible: true,
        type: 'method'
    },
    {
    
        id: 20,
        name: '1st Bake Time',
        amount: '',
        units: 'mins',
        isVisible: true,
        type: 'method'
    },
    {
        id: 21,
        name: '1st Bake Temp',
        amount: '',
        units: 'C',
        isVisible: true,
        type: 'method'
    },
    {
    
        id: 22,
        name: '2nd Bake Time',
        amount: '',
        units: 'mins',
        isVisible: true,
        type: 'method'
    },
    {
    
        id: 23,
        name: '2nd Bake Temp',
        amount: '',
        units: 'C',
        isVisible: true,
        type: 'method'
    },
    {
        id: 24,
        name: 'Container',
        amount: '',
        units: '1=tray / 2=tin / 3=dutch',
        isVisible: true,
        type: 'method'
    },
    {
        id: 25,
        name: 'Water Volume',
        amount: '',
        units: 'ml',
        isVisible: true,
        type: 'method'
    }
  ];

  const ingredientsData = [
    // these are the key componpnenets that the user will be asked to input information on
    {
        id:  'Master1',
        title: "Type of Loaf",
        data: [
            {
                name: "Regular Loaf",
                isSelected: false,
            }, 
            {
                name: "Sourdough Loaf",
                isSelected: false,
            },
            {
                name: "Bagels",
                isSelected: false,
            },
            {
                name: "English Muffins",
                isSelected: false,
            }
        ],
    },
    {
        id: 'Master2',
        title: "Ingredients",
        data: [
            {
                category: 'Flour Type',
                name: "All Purpose Flour",
                isSelected: false,
            },
            {
                category: 'Flour Type',
                name: "Bread Flour",
                isSelected: false,
            },
            {
                category: 'Flour Type',
                name: "Whole Wheat Flour",
                isSelected: false,
            },
            {
                category: 'Flour Type',
                name: "White Whole Wheat Flour",
                isSelected: false,
            },
            {
                category:'Base Ingredients',
                name: 'Flour',
                isSelected: true,
            },
            {
                category:'Base Ingredients',
                name: 'Salt',
                isSelected: true,
            },
            {
                category:'Base Ingredients',
                name: 'Yeast (or Starter)', //update this at a later stage to select based on loaf type
                isSelected: true,
            },
            {
                category:'Base Ingredients',
                name: 'Water',
                isSelected: true,
            },
            {
                category:'Base Ingredients',
                name: 'Sugar',
                isSelected: true,
            },
            {
                category:'Base Ingredients',
                name: 'Butter',
                isSelected: true,
            },
            {
                category:'Base Ingredients',
                name: 'Eggs', //update this later to select based on loaf type
                isSelected: true,
            },
            {
                category:'Base Ingredients',
                name: 'Milk', //update this later to select based on loaf type
                isSelected: true,
            }
        ]
    },
    {
        id: 'Master3',
        title: "Length of Prove",
        data: [
            {
                name: 'First Prove',
                duration: '0', // update this to days/hours/mins   
            },
            {
                name: 'Second Prove',
                duration: '0', // update this to days/hours/mins
            }],
    },
    {
        id: 'Master4',
        title: 'Cooking Method',
        data: [
            {
                name: 'Kneed Time',
                duration: '0',
            },
            {
                name: 'Oven Temperature',
                duration: '0',
            },
            {
                name: 'Volume of Water',
                amount: '0',
            },
            {
                name: 'Type of Container',
                options: '',
            }
            ],
    },
  ];

  export { inputData, ingredients, ingredientsData }