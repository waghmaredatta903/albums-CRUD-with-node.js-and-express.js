const cl = console.log;

let albums = [
    {
        "userId": 1,
        "id": "1",
        "title": "quidem molestiae enim"
    },
    {
        "userId": 1,
        "id": "2",
        "title": "sunt qui excepturi placeat culpa"
    },
    {
        "userId": 1,
        "id": "3",
        "title": "omnis laborum odio"
    },
    {
        "userId": 1,
        "id": "4",
        "title": "non esse culpa molestiae omnis sed optio"
    },
    {
        "userId": 1,
        "id": "5",
        "title": "eaque aut omnis a"
    }
]

const port = 3000;

const express = require("express");

const app = express();

app.use(express.json())

app.get("/api/albums", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            body: albums,
            message: "albums fetched Successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Somathing went wrong",
            error: err.message
        })
    }
})

//get api fetched single albums

app.get("/api/albums/:id", (req, res) => {
    try {
        const albumsId = req.params.id;

        const album = albums.find((item) => item.id === albumsId);

        if (!album) {
            return res.status(404).json({
                suucess: false,
                message: `album with id ${albumsId} not found`
            });
        }
        return res.status(200).json({
            success: true,
            message: `albums with id ${albumsId} fetch Suuceessfully !!!`,
            data: album
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went Wrong",
            error: err.message
        });
    }
});

// create albums 

app.post("/api/albums", (req, res) => {
    try {
        let body = req.body;

        let newAlbum = {
            userId: body.userId,
            id: String(Date.now()),
            title: body.title,
            body: body.body
        };
        albums.push(newAlbum);

        res.status(201).json({
            success: true,
            message: "Albums created Successfully!!!",
            data: newAlbum
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Albums data fetched not found",
            error: err.message
        })

    }
});

// Update albums api

app.patch("/api/albums/:id", (req,res) =>{
    try{
        let id = req.params.id;
        
        let album = albums.find((ele) => ele.id === id);

        if(!album){
            return res.status(404).json({
                success : false,
                message : "Albums not found!!!"

            });
        }
        album.userId = req.body.userId;
        album.title = req.body.title;
        album.body = req.body.body;

        res.status(200).json({
            success : true,
            message : "Albums updated Successfully!!!",
            data : album
        });
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Album data fetched not found!!",
            error : err.message
        });
    }
});

//delete Albums 

app.delete("/api/albums/:id", (req,res) =>{
    try{
        let delete_id = req.params.id;
        let index = albums.findIndex((ele) => ele.id === delete_id);

        if(index === -1){
            return res.status(404).json({
                success : false,
                message : "Albums not found!!!"
            });
        }
        let deleteAlbums = albums.splice(index, 1);

        res.status(200).json({
            success : true,
            message : "Albums Deleted Successfully!!!",
            data : deleteAlbums[0]
        });
    }catch(err){
        res.status(500).json({
            success : false,
            message : "Albums delete failed!!!",
            error : err.message
        });
    }
});

app.listen(port, () => {
    cl("albums data fetched Successfully!!!")
})