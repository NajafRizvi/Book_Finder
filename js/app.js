// Execute when Pageload on First Time
window.onload = setUpFieldEvents;

function setUpFieldEvents() {
    document.getElementById("results").innerHTML = ""
}
// Run for Click Event
document.getElementById('button').addEventListener('click', () => {
    var search = document.getElementById("search").value
    if (search === null || search == "") {
        alertmessage()
    }
    document.getElementById("results").innerHTML = ""
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + search;
    fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data.items.length)
            for (i = 0; i < data.items.length; i++) {
                var jdata = data.items[i].volumeInfo
                document.getElementById("results").innerHTML +=

                    `<div  class="col-xm-12 col-lg-3 col-md-4 mb-3">
                <div class="d-flex justify-content-center">
                <img src="${jdata.imageLinks.thumbnail}" height="50%" alt="books" class="img-thumbnail">  
                </div>
                <div class="row mt-2 d-flex justify-content-center first_row">
                <p class="text-warning font-weight-bolder text-center">${jdata.title}</p>
                </div>
                <div class="row d-flex justify-content-center">
                <h6 class="text-muted text-center font-weight-lighter">By:${jdata.authors[0]}</h6>
                </div>
                <div class="row d-flex justify-content-center">
                <a target='_blank' href="${jdata.infoLink}"><button class="btn btn-outline-primary">Learn more</button></a>
                </div>
            </div>
            `

            }

        })
        .catch(function () {
            console.log("error")
        });
    $('html,body').animate({
        scrollTop: $("container").offset().top
    },
        'slow');

})
function alertmessage() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Type Book Name',
    })
}
window.smoothScroll = function (target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function (c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function () { scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
// For Press Enker Key
document.querySelector('#search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        var search = document.getElementById("search").value
        document.getElementById("results").innerHTML = ""
        var url = "https://www.googleapis.com/books/v1/volumes?q=" + search;
        fetch(url) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data.items.length)
                for (i = 0; i < data.items.length; i++) {
                    var jdata = data.items[i].volumeInfo
                    document.getElementById("results").innerHTML +=

                        `<div  class="col-xm-12 col-lg-3 col-md-4 mb-3">
                        <div class="d-flex justify-content-center">
                        <img src="${jdata.imageLinks.thumbnail}" height="50%" alt="books" class="img-thumbnail">  
                        </div>
                        <div class="row mt-2 d-flex justify-content-center first_row">
                        <p class="text-warning font-weight-bolder text-center">${jdata.title}</p>
                        </div>
                        <div class="row d-flex justify-content-center">
                        <h6 class="text-muted text-center font-weight-lighter">By:${jdata.authors[0]}</h6>
                        </div>
                        <div class="row d-flex justify-content-center">
                        <a target='_blank' href="${jdata.infoLink}"><button class="btn btn-outline-primary">Learn more</button></a>
                        </div>
                    </div>
                    `

                }

            })
            .catch(function () {
                console.log("error")
            });
        $('html,body').animate({
            scrollTop: $("container").offset().top
        },
            'slow');
    }
});



