const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Intermediate", "Difficult"]
    },
    prepTime: {
        type: Number,
        required: true,
    },
    cookTime: {
        type: Number,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
        enum: ["200g spaghetti",
    "100g guanciale or pancetta, diced",
    "2 large eggs",
    "50g grated Pecorino Romano cheese",
    "Salt and black pepper to taste",
    "500g boneless, skinless chicken thighs, cut into bite-sized pieces",
    "1 cup plain yogurt",
    "2 tablespoons vegetable oil",
    "2 onions, finely chopped",
    "4 cloves garlic, minced",
    "1-inch piece of ginger, grated",
    "2 teaspoons ground coriander",
    "1 teaspoon ground cumin",
    "1 teaspoon paprika",
    "1/2 teaspoon turmeric",
    "1/2 teaspoon cayenne pepper (adjust to taste)",
    "1 cup tomato puree",
    "1 cup heavy cream",
    "Salt and cilantro leaves for garnish",
    "1 cup (2 sticks) unsalted butter, softened",
    "3/4 cup granulated sugar",
    "3/4 cup packed light brown sugar",
    "1 teaspoon vanilla extract",
    "2 large eggs",
    "2 1/4 cups all-purpose flour",
    "1 teaspoon baking soda",
    "1/2 teaspoon salt",
    "2 cups semisweet chocolate chips"
]
    }],
    instructions: [{
        type: String,
        default: ["Cook the spaghetti in boiling salted water until al dente.",
    "Meanwhile, sauté the guanciale or pancetta until crispy.",
    "In a bowl, whisk together eggs and grated cheese.",
    "Drain the spaghetti and immediately toss with the egg mixture and cooked guanciale/pancetta.",
    "Season with salt and pepper. Serve immediately.",
    "Marinate chicken pieces in yogurt and spices for at least 1 hour.",
    "Heat oil in a pan and sauté onions, garlic, and ginger until golden.",
    "Add marinated chicken and cook until browned.",
    "Stir in tomato puree and cook until chicken is cooked through.",
    "Add cream, season with salt, and simmer for a few minutes.",
    "Garnish with cilantro leaves and serve with rice or naan.",
    "Preheat the oven to 375°F (190°C). Line baking sheets with parchment paper.",
    "In a large bowl, cream together the butter, granulated sugar, and brown sugar until smooth.",
    "Beat in the vanilla extract and eggs one at a time until well blended.",
    "Combine the flour, baking soda, and salt; gradually stir into the creamed mixture.",
    "Stir in the chocolate chips by hand using a wooden spoon.",
    "Drop by rounded spoonfuls onto the prepared baking sheets.",
    "Bake for 8 to 10 minutes in the preheated oven, or until edges are golden.",
    "Allow cookies to cool on baking sheet for 5 minutes before transferring to a wire rack to cool completely."
],
    }],
    imageUrl: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Recipe = mongoose.model("Recipe", RecipeSchema)

module.exports= Recipe


  