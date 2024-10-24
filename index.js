require("dotenv").config();
const express = require('express')
const app = express()

const {initializeDatabase} = require("./db/db.connect")
const Recipe = require("./models/recipe.models")
initializeDatabase()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json())

//3. Create an API with route 
// "/recipes" to create a new recipe in the recipes database.

// {
//     "title": "Classic Chocolate Chip Cookies",
//     "author": "Baker Betty",
//     "difficulty": "Easy",
//     "prepTime": 15,
//     "cookTime": 10,
//     "ingredients": [
//       "1 cup (2 sticks) unsalted butter, softened",
//       "3/4 cup granulated sugar",
//       "3/4 cup packed light brown sugar",
//       "1 teaspoon vanilla extract",
//       "2 large eggs",
//       "2 1/4 cups all-purpose flour",
//       "1 teaspoon baking soda",
//       "1/2 teaspoon salt",
//       "2 cups semisweet chocolate chips"
//     ],
//     "instructions": [
//       "Preheat the oven to 375°F (190°C). Line baking sheets with parchment paper.",
//       "In a large bowl, cream together the butter, granulated sugar, and brown sugar until smooth.",
//       "Beat in the vanilla extract and eggs one at a time until well blended.",
//       "Combine the flour, baking soda, and salt; gradually stir into the creamed mixture.",
//       "Stir in the chocolate chips by hand using a wooden spoon.",
//       "Drop by rounded spoonfuls onto the prepared baking sheets.",
//       "Bake for 8 to 10 minutes in the preheated oven, or until edges are golden.",
//       "Allow cookies to cool on baking sheet for 5 minutes before transferring to a wire rack to cool completely."
//     ],
//     "imageUrl": "https://example.com/classic_chocolate_chip_cookies.jpg"
//   }

async function createRecipes(newRecipe) {
    try {
        const recipe = new Recipe(newRecipe)
        const saveRecipe = await recipe.save()
        return saveRecipe
    } catch (error) {
        console.log(error)
    }
}

app.post('/recipes',async(req, res)=> {
    try {
        const savedRecipe = await createRecipes(req.body)
        res.status(200).json({message: "New Recipe created successfully", newRecipe: savedRecipe})
    } catch (error) {
        res.status(500).json({error: "Failed to create a recipe"})
    }
})

//6. get all the recipes in the database as a response 
async function readAllRecipe() {
    try {
        const allRecipes = await Recipe.find()
        return allRecipes
    } catch (error) {
        throw error
    }
}

app.get('/recipes',async(req, res)=> {
    try{
        const recipes = await readAllRecipe()
        if(recipes.length != 0){
            res.json(recipes)
        }else{
            res.status(404).json({error: "Recipe not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch recipes"})
    }
})

//7. get a recipe's details by its title.

async function readRecipesByTitle(titleName) {
    try {
        const allRecipes = await Recipe.find({title: titleName})
        return allRecipes
    } catch (error) {
        throw error
    }
}

app.get('/recipes/:titleName',async(req, res)=> {
    try{
        const recipes = await readRecipesByTitle(req.params.titleName)
        if(recipes.length != 0){
            res.json(recipes)
        }else{
            res.status(404).json({error: "recipe not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch recipes"})
    }
})

// 8. get details of all the recipes by an author

async function readRecipesByAuthor(authorName) {
    try {
        const allRecipes = await Recipe.find({author: authorName})
        return allRecipes
    } catch (error) {
        throw error
    }
}

app.get('/recipes/author/:authorName',async(req, res)=> {
    try{
        const recipes = await readRecipesByAuthor(req.params.authorName)
        if(recipes.length != 0){
            res.json(recipes)
        }else{
            res.status(404).json({error: "recipe not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch recipes"})
    }
})

//9. Create an API to get all the recipes that are of "Easy" difficulty level.

async function readRecipesByDifficulty(difficultyType) {
    try {
        const allRecipes = await Recipe.find({difficulty: difficultyType})
        return allRecipes
    } catch (error) {
        throw error
    }
}

app.get('/recipes/difficulty/:difficultyType',async(req, res)=> {
    try{
        const recipes = await readRecipesByDifficulty(req.params.difficultyType)
        if(recipes.length != 0){
            res.json(recipes)
        }else{
            res.status(404).json({error: "Recipe not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch Recipes"})
    }
})

// 10. update a recipe's difficulty level with the help of its id.

async function updateRecipesById(recipeId, dataToUpdate) {
    try{
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
        return updatedRecipe
    }catch(error){
        console.log("Error in updating recipe detail", error)
    }
}

app.post('/recipes/:recipeId', async(req, res)=> {
    try{
        const updatedRecipe = await updateRecipesById(req.params.recipeId, req.body)
        // console.log(req.params.recipeId)
        // console.log(req.body)
        if(updatedRecipe){
            res.status(200).json({message: "Recipe updated successfully", updatedRecipe: updatedRecipe})
        }else{
            res.status(404).json({error: "Recipe not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update recipe"})
    }
})

// 11. upate a recipe's prep time and cook time with the help of its title.

async function updateRecipeByTitle(recipeTitle, dataToUpdate) {
    try{
        const updatedRecipe = await Recipe.findOneAndUpdate({title: recipeTitle}, dataToUpdate, {new: true})
        return updatedRecipe
    }catch(error){
        console.log("Error in updating recipe detail", error)
        throw error
    }
}

app.post('/recipes/:recipeTitle', async(req, res)=> {
    try{
        const updatedRecipe = await updateRecipeByTitle(parseInt(req.params.recipeTitle), req.body)
        console.log(req.params.recipeTitle)
        console.log(req.body)
        if(updatedRecipe){
            res.status(200).json({message: "Recipe updated successfully", updatedRecipe: updatedRecipe})
        }else{
            res.status(404).json({error: "Recipe not found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update recipe"})
    }
})

// 12. delete a recipe with the help of a recipe id

async function deleteRecipe(recipeId) {
    try{
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId)
        return deletedRecipe
    }catch(error){
        console.log(error)
    }
}

app.delete('/recipes/:recipeId', async(req, res)=> {
    try{
        const recipeDeleted = await deleteRecipe(req.params.recipeId)
        if(recipeDeleted){
            res.status(200).json({message: "Recipe deleted successfully"})
        }else{
            res.status(404).json({error: "Recipe not found"})
        }
    }catch{
        res.status(500).json({error: "Failed to delete recipe"})
    }
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})