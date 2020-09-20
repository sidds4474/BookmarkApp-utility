const modal=document.querySelector('.modal-container')
//const modalShow=document.getElementById('show-modal')
const closemodal=document.getElementById('close-modal')
const modalheader=document.getElementById('open-modal')
const formcontent=document.getElementById('form-content')
const websitename=document.getElementById('website-name')
const websitelink=document.getElementById('website-link')
const savebtn=document.getElementById('save-btn')
const container=document.getElementById('bookmark-container')

closemodal.addEventListener('click',closeModal)
modalheader.addEventListener('click',showModal1)
window.addEventListener('click',(e)=>(e.target===modal ? modal.classList.remove('show-modal'):false))
formcontent.addEventListener('submit',storeValue)
//savebtn.addEventListener('click',validateUrl)

let bookmarks=[]

function closeModal(){
  modal.classList.remove('show-modal')
}


function showModal1(){
  modal.classList.add('show-modal')
}

function buildBookmarks(url){
  container.textContent=''
  bookmarks.forEach((bookmark)=>{
    const{name,url}=bookmark
    const item=document.createElement('div')
    item.classList.add('item')
    const icon=document.createElement('i')
    icon.classList.add('fas','fa-times')
    icon.setAttribute('title','Delete Bookmark')
    icon.setAttribute('onclick',`deleteBookmark('${url}')`)
    const img=document.createElement('img')
    img.classList.add('favicon')
    img.setAttribute('src',`https://www.google.com/s2/favicons?domain=${url}`)
    const anchor=document.createElement('a')
    anchor.classList.add('link')
    anchor.setAttribute('href',`${url}`)
    anchor.setAttribute('target','_blank')
    anchor.textContent=name
    item.append(icon,img,anchor)
    //console.log(item)

    container.appendChild(item)


  })
} 

function fetchBookmarks(){
   if(localStorage.getItem('bookmarks')){
     bookmarks=JSON.parse(localStorage.getItem('bookmarks'))
   }
  //  else{
  //    bookmarks=[
  //   {
  //     name:'Google',
  //     url:'www.google.com'
  //   }
  // ]
  // localStorage.setItem('bookmarks',JSON.stringify(bookmarks)) 
  //  }
   buildBookmarks()
}
function deleteBookmark(url){
  bookmarks.forEach((bookmark,i)=>{
    if(bookmark.url==url){
      bookmarks.splice(i,1)    
    }
  })
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks)) 
  fetchBookmarks()
}

function storeValue(e){
  e.preventDefault()
   websiteUrl=websitelink.value
   const websiteName=websitename.value
  if(!websiteUrl.includes('http','https')){
    websiteUrl=`https://${websiteUrl}`
    console.log(websiteUrl)
    
    if(validateUrl(websiteUrl,websiteName)){
      const bookmark={
        name:websiteName,
        url:websiteUrl
      }
      bookmarks.push(bookmark)
      console.log(bookmarks)
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
      fetchBookmarks()
      formcontent.reset()
      websitename.focus()
      closeModal()
    }
    else{
      closeModal()
    }
  }
  else{
    if(validateUrl(websiteUrl,websiteName)){
      const bookmark={
        name:websiteName,
        url:websiteUrl
      }
      bookmarks.push(bookmark)
      console.log(bookmarks)
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
      fetchBookmarks()
      formcontent.reset()
      websitename.focus()
      closeModal()
    }
    else{
      closeModal()
    }
  }
}
function validateUrl(websiteUrl,websiteName){

  if(!websiteUrl || !websiteName){
    alert("Please Enter both the fields and then proceed")
    return false;
  }
  let expression=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  var regex = new RegExp(expression);
  if(websiteUrl.match(regex)){
    return true
  }
  else{
    alert("enter a valid value")
    return false
  }

}
fetchBookmarks()