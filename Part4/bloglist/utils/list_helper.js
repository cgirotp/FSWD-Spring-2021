const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    var l = blogs.length
    if (l === 0) {
        return 0
    } else {
        var sum = 0
        for (var i = 0; i < l; i++) {
            sum = sum + blogs[i].likes
        }
        return sum
    }
}

const favoriteBlog = (blogs) => {
    var l = blogs.length
    if (l === 0) {
        return null
    } else {
        var max = blogs[0]
        for (var i = 0; i < l; i++) {
            if (blogs[i].likes > max.likes) {
                max = blogs[i]
            }
        }
        return {
            title: max.title,
            author: max.author,
            likes: max.likes
        }
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}