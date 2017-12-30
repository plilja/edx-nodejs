const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db', {useMongoClient: true})

const Post = mongoose.model('Post',
    { 
        name: String,
        url: String,
        text: String,
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    }
)

const Comment = mongoose.model('Comment', 
    {
        text: String
    }
)

const ca = [
    {text: 'Comment 1'},
    {text: 'Comment 2'},
    {text: 'Comment 3'},
].map((comment) => {
    const c = new Comment(comment)
    c.save()
    return c._id
})
console.log(ca)

const post = new Post(
    {
        name: 'Post 1',
        url: 'http://www.test.com',
        text: 'yada yada yada...',
        comments: ca
    }
)

post.save((err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('The post is saved: ', post.toJSON())
    }
    Post.findOne({name: /post 1/i })
    .populate('comments')
    .exec((err, post) => {
        if (err) {
            return console.error(err)
        } else {
            console.log(`The post is ${post}`)
            mongoose.disconnect()
        }
    })
})
