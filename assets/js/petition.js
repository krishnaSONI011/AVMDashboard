const alias_button = document.getElementById('deceased_alias')
const alias_box = document.getElementById('alias_container')
const remove_button = document.getElementById('remove_deceased_alias')


alias_button.addEventListener('click',show_box)
remove_button.addEventListener('click',hide_box)
function show_box(e){
    e.preventDefault()
    alias_box.classList.remove('hidden')
    alias_button.classList.add('hidden')
}

function hide_box(e){
    e.preventDefault()
    alias_box.classList.add('hidden')
    alias_button.classList.remove('hidden')
}