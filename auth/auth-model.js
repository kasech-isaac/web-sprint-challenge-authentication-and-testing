const db=require("../database/dbConfig")
 
function findByUser(data) {
	return db("users")
    .select("id", "username", "password")
        .where("users.username", data)
        .first()
}

function findById(id) {
    return db("users")
    .where("id", id)
	
}


async function add(user) {
    const [id] = await db("users").insert(user)
	return findById(id)
}

module.exports = {
    
    add,
    findByUser,
    findById,
    
}