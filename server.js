const db = require('./config/db');
const express = require('express');

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('TaskFlow API is running!');
});

// Start server

// GET tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const [tasks] = await db.query(
            'SELECT * FROM tasks'
        );

        res.status(200).json({
            success: true,
            data: tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//GET users 
app.get('/api/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//GET projects
app.get('/api/projects', async (req, res) => {
    try {
        const [projects] = await db.query(
            'SELECT * FROM projects'
        );

        res.status(200).json({
            success: true,
            data: projects
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//GET user by single id 
app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [user] = await db.query('SELECT * FROM users  WHERE user_id = ?', [id]);

     if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


//POST users

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// PUT users 
app.put('/api/users/:id', async (req ,res)=>{
    try {
        const { id } = req.params;
        const{name,email,password } = req.body;

        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const[result] = await db.query('update users set name = ? , email=?,password= ? where user_id=?',[name,email,password,id])

        if( result.affectedRows ===0){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        
        }
        res.status(200).json({
            success:true,
            message:"user update successfully"
        })
    }
    catch (error){
        res.status(500).json({
            success:false,
            message:"error.message"
        })
    }
});

// DELETE users
app.delete('/api/users/:id', async (req,res)=>{
    try{
        const{id}=req.params;
        const[result]= await db.query('delete from users where user_id=?',[id])
        if (result.affectedRows===0){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

//START server

async function startServer() {
    try {
        await db.query('SELECT 1');

        console.log('MySQL connected successfully!');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
}

startServer();
