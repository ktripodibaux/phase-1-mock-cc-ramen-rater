// write your code here
document.addEventListener('DOMContentLoaded', () => {
    fetchRamen('http://localhost:3000/ramens');

        const form = document.querySelector('#new-ramen')
        form.addEventListener('submit', function(event) {
            event.preventDefault()
            const form = document.querySelector('#new-ramen')
            const newName = document.querySelector('#new-name').value
            const newRest = document.querySelector('#new-restaurant').value
            const newImg = document.querySelector('#new-image').value
            const newRating = document.querySelector('#new-rating').value
            const newComment = document.querySelector('#new-comment').value
            const newRamen = {
                'name': newName,
                'restaurant': newRest,
                'image': newImg,
                'rating': newRating,
                'comment': newComment,
                }
            appendRamenPreview(newRamen);
        fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamen)
    }).then(response => response.json()).then(data => {
        console.log('Success:', data);
      }).catch((error) => {
        console.error('Error:', error);
      });
        })
        
});

function changeRamenDisplay(object) {
    // const div = document.createElement('div')
    const name = document.querySelector('.name')
    const rest = document.querySelector('.restaurant')
    const rate = document.querySelector('#rating-display')
    const comment = document.querySelector('#comment-display')
    const img = document.querySelector('.detail-image')
    const id = object.target.id
    
    fetch(`http://localhost:3000/ramens/${id}`).then(res => res.json()).then(data => {
        name.textContent = data.name
        rest.textContent = data.restaurant
        rate.textContent = data.rating
        comment.textContent = data.comment
        img.src = data.image
    })
}

function fetchRamen(url) {
    fetch(url).then(resp => resp.json()).then(data => {
        for (let ramen in data) {
            appendRamenPreview(data[ramen]);
        }
    })
}

function appendRamenPreview(object) {
    const img = document.createElement('img')
    img.src = object.image
    img.id = object.id
    img.addEventListener('click', function(object) {
        changeRamenDisplay(object);
    })
    document.querySelector('#ramen-menu').append(img)
}

