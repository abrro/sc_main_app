(function(){"use strict";var e={504:function(e,t,i){var o=i(6369),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",[t("b-navbar",{attrs:{toggleable:"lg",type:"dark",variant:"secondary"}},[t("b-navbar-brand",{attrs:{to:"/"}},[e._v("Movies")]),t("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),t("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[t("b-navbar-nav",[t("b-nav-item",[t("router-link",{attrs:{to:{name:"home"}}},[e._v(" Home ")])],1),t("b-nav-item",[t("router-link",{attrs:{to:{name:"trendingMovies"}}},[e._v(" Trending ")])],1),t("b-nav-item",[t("router-link",{attrs:{to:{name:"topRatedMovies"}}},[e._v(" Top rated ")])],1),t("b-nav-item",[t("router-link",{attrs:{to:{name:"searchMovies"}}},[e._v(" Search ")])],1)],1),t("b-navbar-nav",{staticClass:"ms-auto"},[e.token?t("b-nav-item",[t("span",[e._v(" User : "+e._s(e.user.user)+" ")])]):e._e(),e.token?e._e():t("b-nav-item",{attrs:{to:"/register"}},[e._v("Register")]),e.token?t("b-nav-item",{on:{click:function(t){return e.logout()}}},[e._v("Log Out")]):t("b-nav-item",{attrs:{to:"/login"}},[e._v("Log In")]),e.token?t("b-nav-item-dropdown",{attrs:{text:"Menu"}},[t("b-dropdown-item",{attrs:{to:{name:"userCollections"}}},[e._v(" My collection ")])],1):e._e()],1)],1)],1)],1),t("router-view")],1)},n=[],a=i(3822),s={name:"App",computed:{...(0,a.rn)(["token","user"])},methods:{...(0,a.OI)(["removeToken","setToken"]),logout(){this.removeToken(),this.$router.push({name:"home"})}},sockets:{error(e){e.message&&alert(e.message)}},mounted(){localStorage.token&&this.setToken(localStorage.token)}},l=s,c=i(1001),d=(0,c.Z)(l,r,n,!1,null,null,null),m=d.exports,u=i(2631),v=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{subtitle:"Home"}})],1)},h=[],p=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("Movie application")]),e.subtitle?t("h3",[e._v(e._s(e.subtitle))]):e._e()])},b=[],f={name:"Header",props:{subtitle:String}},g=f,_=(0,c.Z)(g,p,b,!1,null,"727ae914",null),y=_.exports,k={name:"Home",components:{Header:y}},$=k,C=(0,c.Z)($,v,h,!1,null,"e75d1506",null),S=C.exports,w=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{subtitle:"Search movies"}}),t("b-container",{attrs:{fluid:""}},[t("b-form",{on:{submit:e.submitSearch}},[t("b-form-group",{attrs:{id:"serach-input-group",label:"Search:","label-for":"search-input"}},[t("b-form-input",{attrs:{id:"search-input",type:"text",placeholder:"Search movies by title...",state:e.validateState("searchInput"),"aria-describedby":"input-search-feedback"},model:{value:e.$v.form.searchInput.$model,callback:function(t){e.$set(e.$v.form.searchInput,"$model","string"===typeof t?t.trim():t)},expression:"$v.form.searchInput.$model"}}),e.$v.form.searchInput.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-search-feedback"}},[e._v("Search input is required.")])],1),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1),e.searchCount>0?t("MovieSearchTable",{attrs:{searchCount:e.searchCount,searchTitle:e.searchTitle}}):0==e.searchCount?t("h2",[e._v("No results found for: "+e._s(e.searchTitle))]):e._e()],1)},M=[],T=function(){var e=this,t=e._self._c;return t("div",[t("b-container",[t("h3",[e._v("Results for : "+e._s(e.searchTitle))]),t("b-pagination",{attrs:{"total-rows":e.searchCount,"per-page":e.perPage},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}),t("b-table",{attrs:{hover:"",items:e.itemProvider,"per-page":e.perPage,"current-page":e.currentPage,fields:e.fields,filter:e.searchTitle},scopedSlots:e._u([{key:"cell(title)",fn:function(i){return[t("b-link",{on:{click:function(t){return e.viewMovie(i.item.id)}}},[e._v(e._s(i.item.title))])]}}])})],1)],1)},x=[],I={name:"MovieSearchTable",props:{searchCount:{type:Number},searchTitle:{type:String}},data(){return{currentPage:1,perPage:10,fields:[{key:"title"},{key:"category.label",label:"Category"},{key:"release_date",label:"Released"}]}},methods:{viewMovie:function(e){this.$router.push({name:"movie",params:{id:e}})},itemProvider:function(e,t){const i="/api/movies/page/"+e.currentPage+"/search?title="+this.searchTitle;return fetch(i,{method:"GET",headers:{Authorization:`Bearer ${localStorage.token}`}}).then((e=>e.json())).then((e=>{const i=e;t(i)})).catch((()=>{t([])})),null}}},R=I,P=(0,c.Z)(R,T,x,!1,null,"69b4e111",null),E=P.exports,q=i(5795),L={name:"SearchMovies",components:{Header:y,MovieSearchTable:E},data(){return{form:{searchInput:""},searchTitle:"",searchCount:-1}},validations:{form:{searchInput:{required:q.C1}}},methods:{validateState(e){const{$dirty:t,$error:i}=this.$v.form[e];return t?!i:null},submitSearch:function(e){e.preventDefault(),this.searchTitle=this.searchInput,this.searchInput="",this.$v.form.$anyError||fetch(`/api/movies/count/search?title=${this.searchTitle}`,{method:"GET",headers:{Authorization:`Bearer ${localStorage.token}`}}).then((e=>e.json())).then((e=>{this.searchCount=e}))}}},j=L,H=(0,c.Z)(j,w,M,!1,null,"6f14c30a",null),O=H.exports,Z=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{subtitle:"Trending movies"}}),e.trendingMovies.length>0?t("MovieCards",{attrs:{mode:1,movies:e.trendingMovies}}):e._e()],1)},A=[],B=function(){var e=this,t=e._self._c;return e.movies.length>0?t("div",e._l(e.movies,(function(i){return t("div",{key:i.id},[t("b-card",[t("b-card-title",[e._v(" "+e._s(i.title)+" ")]),t("b-card-text",[t("div",[e._v(e._s(e._f("slicedContent")(i.synopsis)))]),t("b-link",{attrs:{to:{name:"movie",params:{id:i.id}}}},[e._v(" Click to see more... ")]),1==e.mode?t("div",[e._v(" Number of reviews: "+e._s(i.reviewsCount)+" ")]):2==e.mode?t("div",[e._v(" Average rating: "+e._s(e._f("rating")(i.avgRating))+" ")]):e._e()],1),t("b-card-sub-title",[e._v(" Released : "+e._s(i.release_date)+" ")])],1),t("br")],1)})),0):e._e()},N=[],F={name:"MovieCards",props:{mode:{type:Number},movies:{type:Array}},filters:{slicedContent(e){return e.length<80?e:e.slice(0,80)+"..."},rating(e){return null==e?"Not rated yet":e+"/10"}}},D=F,z=(0,c.Z)(D,B,N,!1,null,"43391ea3",null),G=z.exports,U={name:"TrendingMovies",components:{Header:y,MovieCards:G},data(){return{trendingMovies:[]}},methods:{...(0,a.nv)(["getTrendingMovies"])},mounted(){this.getTrendingMovies().then((e=>{this.trendingMovies=e}))}},J=U,W=(0,c.Z)(J,Z,A,!1,null,"0ccf04b1",null),V=W.exports,X=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{subtitle:"Top rated movies"}}),e.topRatedMovies.length>0?t("MovieCards",{attrs:{mode:2,movies:e.topRatedMovies}}):e._e()],1)},Y=[],K={name:"TopRatedMovies",components:{Header:y,MovieCards:G},data(){return{topRatedMovies:[]}},methods:{...(0,a.nv)(["getTopRatedMovies"])},mounted(){this.getTopRatedMovies().then((e=>{this.topRatedMovies=e}))}},Q=K,ee=(0,c.Z)(Q,X,Y,!1,null,"1c5c3c1c",null),te=ee.exports,ie=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("Header",{attrs:{subtitle:"Log In"}}),t("b-form",{on:{submit:e.onSubmit}},[t("b-form-group",{attrs:{label:"Email:","label-for":"email"}},[t("b-form-input",{attrs:{id:"email",placeholder:"Enter email",state:e.validateState("email"),"aria-describedby":"input-email-feedback"},model:{value:e.$v.form.email.$model,callback:function(t){e.$set(e.$v.form.email,"$model",t)},expression:"$v.form.email.$model"}}),e.$v.form.email.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-email-feedback"}},[e._v("Email is required.")]),e.$v.form.email.email?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-email-feedback"}},[e._v("Must be a proper email.")])],1),t("b-form-group",{attrs:{label:"Password:","label-for":"password"}},[t("b-form-input",{attrs:{id:"password",type:"password",placeholder:"Enter password",state:e.validateState("password"),"aria-describedby":"input-password-feedback"},model:{value:e.$v.form.password.$model,callback:function(t){e.$set(e.$v.form.password,"$model",t)},expression:"$v.form.password.$model"}}),e.$v.form.password.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-password-feedback"}},[e._v("Password is required.")])],1),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1)},oe=[],re={name:"Login",components:{Header:y},data(){return{form:{email:"",password:""}}},validations:{form:{email:{required:q.C1,email:q.Do},password:{required:q.C1}}},methods:{...(0,a.nv)(["login"]),validateState(e){const{$dirty:t,$error:i}=this.$v.form[e];return t?!i:null},onSubmit(e){e.preventDefault(),this.$v.form.$touch(),this.$v.form.$anyError||(this.login(this.form),this.$router.push({name:"home"}))}}},ne=re,ae=(0,c.Z)(ne,ie,oe,!1,null,"3c492346",null),se=ae.exports,le=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("Header",{attrs:{subtitle:"Create new account"}}),t("b-form",{on:{submit:e.onSubmit}},[t("b-form-group",{attrs:{label:"Email address:","label-for":"email"}},[t("b-form-input",{attrs:{id:"email",type:"email",placeholder:"Enter email",state:e.validateState("email"),"aria-describedby":"input-email-feedback"},model:{value:e.$v.form.email.$model,callback:function(t){e.$set(e.$v.form.email,"$model",t)},expression:"$v.form.email.$model"}}),e.$v.form.email.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-email-feedback"}},[e._v("Email is required.")]),e.$v.form.email.email?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-email-feedback"}},[e._v("Must be a proper email.")])],1),t("b-form-group",{attrs:{label:"User Name:","label-for":"name"}},[t("b-form-input",{attrs:{id:"name",placeholder:"Enter name",state:e.validateState("name"),"aria-describedby":"input-name-feedback"},model:{value:e.$v.form.name.$model,callback:function(t){e.$set(e.$v.form.name,"$model",t)},expression:"$v.form.name.$model"}}),e.$v.form.name.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-name-feedback"}},[e._v("Name is required.")]),e.$v.form.name.minLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-name-feedback"}},[e._v("Must be at least 3 characters long.")]),e.$v.form.name.maxLenght?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-name-feedback"}},[e._v("Must not be longer than 20 characters.")])],1),t("b-form-group",{attrs:{label:"Password:","label-for":"password"}},[t("b-form-input",{attrs:{id:"password",type:"password",state:e.validateState("password"),"aria-describedby":"input-password-feedback"},model:{value:e.$v.form.password.$model,callback:function(t){e.$set(e.$v.form.password,"$model",t)},expression:"$v.form.password.$model"}}),e.$v.form.password.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-password-feedback"}},[e._v("Password is required.")]),e.$v.form.password.minLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-password-feedback"}},[e._v("Must be at least 8 characters long.")])],1),t("br"),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1)},ce=[],de={name:"Register",components:{Header:y},data(){return{form:{email:"",name:"",password:""}}},validations:{form:{email:{required:q.C1,email:q.Do},name:{required:q.C1,minLength:(0,q.Ei)(3),maxLenght:(0,q.BS)(20)},password:{required:q.C1,minLength:(0,q.Ei)(8)}}},methods:{...(0,a.nv)(["register"]),validateState(e){const{$dirty:t,$error:i}=this.$v.form[e];return t?!i:null},onSubmit(e){e.preventDefault(),this.$v.form.$anyError||(this.register(this.form),this.$router.push({name:"home"}))}}},me=de,ue=(0,c.Z)(me,le,ce,!1,null,"e67f12aa",null),ve=ue.exports,he=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{subtitle:"My collections"}}),t("br"),t("b-button",{on:{click:function(t){return e.addCollection()}}},[e._v("Add collection")]),t("br"),e.userCollections.length?t("b-container",[t("b-table",{attrs:{id:"movies-table",hover:"",items:e.userCollections,fields:e.fields},scopedSlots:e._u([{key:"cell(action)",fn:function(i){return[t("b-button",{attrs:{size:"sm"},on:{click:i.toggleDetails}},[e._v(" "+e._s(i.detailsShowing?"Hide":"Show")+" Details ")]),t("b-button",{attrs:{size:"sm"},on:{click:function(t){return e.viewCollection(i.item.id)}}},[e._v("View")]),t("b-button",{attrs:{size:"sm"},on:{click:function(t){return e.editCollection(i.item.id)}}},[e._v("Edit")]),t("b-button",{attrs:{size:"sm"},on:{click:function(t){return e.removeCollection(i.item.id)}}},[e._v("Delete")])]}},{key:"row-details",fn:function(i){return[t("b-card",[t("b-card-body",[e._v("Description:"+e._s(i.item.description))])],1)]}}],null,!1,3373323927)})],1):e._e()],1)},pe=[],be={name:"UserCollections",components:{Header:y},data(){return{userCollections:[],fields:[{key:"label"},{key:"action"}]}},methods:{...(0,a.nv)(["deleteCollection","getUserCollections"]),addCollection:function(){this.$router.push({name:"collectionForm"})},editCollection:function(e){this.$router.push({name:"collectionForm",params:{id:e}})},viewCollection:function(e){this.$router.push({name:"collection",params:{id:e}})},removeCollection:function(e){this.deleteCollection(e).then((e=>{alert(e.msg),this.getCollections()}))},getCollections:function(){this.getUserCollections().then((e=>{this.userCollections=e}))}},mounted(){this.getCollections()}},fe=be,ge=(0,c.Z)(fe,he,pe,!1,null,"07ad1cbc",null),_e=ge.exports,ye=function(){var e=this,t=e._self._c;return t("div",[e.movie?t("Header",{attrs:{subtitle:this.movie.title}}):e._e(),e.movie?t("div",{staticClass:"row"},[t("div",{staticClass:"col-6"},[t("b-card",{attrs:{title:"About"}},[t("b-card-sub-title",[e._v(" Category : "+e._s(this.movie.category.label)+" ")]),t("b-card-text",[e._v(" Synopsis : "+e._s(this.movie.synopsis)+" ")]),t("b-card-sub-title",[e._v(" Release date : "+e._s(this.movie.release_date)+" ")])],1)],1),t("div",{staticClass:"col-6"},[t("b-card",[t("b-card-title",[e._v(" Cast and crew: ")]),e.movie.roles[2]?t("div",[e._v(" Directed by: "),e._l(e.movie.roles[2].celebrities,(function(i){return t("b-badge",{key:i.id},[t("b-link",{attrs:{to:{name:"celebrity",params:{id:i.id}}}},[e._v(e._s(e._f("nameAndLastname")(i)))])],1)}))],2):e._e(),e.movie.roles[1]?t("div",[e._v(" Written by: "),e._l(e.movie.roles[1].celebrities,(function(i){return t("b-badge",{key:i.id},[t("b-link",{attrs:{to:{name:"celebrity",params:{id:i.id}}}},[e._v(e._s(e._f("nameAndLastname")(i)))])],1)}))],2):e._e(),e.movie.roles[0]?t("div",[e._v(" Starring: "),e._l(e.movie.roles[0].celebrities,(function(i){return t("b-badge",{key:i.id,attrs:{to:{}}},[t("b-link",{attrs:{to:{name:"celebrity",params:{id:i.id}}}},[e._v(e._s(e._f("nameAndLastname")(i)))])],1)}))],2):e._e()],1)],1)]):e._e(),e.movie&&e.user?t("div",{staticClass:"row justify-content-center"},[t("div",{staticClass:"col-6"},[t("h3",[e._v("Leave a review:")]),t("ReviewForm",{attrs:{movieId:this.$route.params.id}})],1)]):e._e(),e.movie&&e.movie.reviews.length>0?t("div",[t("h2",[e._v("Reviews: ")]),e._l(e.movie.reviews,(function(i){return t("div",{key:i.id,staticClass:"row justify-content-center"},[t("div",{staticClass:"col-6"},[t("b-card",{staticClass:"mt-3"},[t("b-card-title",[e._v(" Summary : "+e._s(i.summary)+" ")]),t("b-card-title",[t("b-form-rating",{attrs:{stars:e.numStars,value:i.rating,inline:"",readonly:"","show-value":""}})],1),t("b-card",[t("b-card-text",[e._v(" Full review: "+e._s(i.comment)+" ")]),t("b-card-footer",[e._v(" By : "+e._s(i.user.name)+" ("+e._s(i.user.email)+") ")])],1)],1)],1)])}))],2):t("h2",[e._v("No reviews yet.")])],1)},ke=[],$e=function(){var e=this,t=e._self._c;return t("div",[t("b-container",{attrs:{fluid:""}},[t("b-form",{on:{submit:e.submitReview}},[t("label",{attrs:{for:"review-rating"}},[e._v("Rate out of 10 stars:")]),t("b-form-rating",{attrs:{id:"review-rating",stars:e.starsNum},model:{value:e.form.rating,callback:function(t){e.$set(e.form,"rating",t)},expression:"form.rating"}}),t("b-form-group",{attrs:{id:"review-summary-group",label:"Review summary:","label-for":"review-summary"}},[t("b-form-input",{attrs:{id:"review-summary",type:"text",placeholder:"Enter summary...",state:e.validateState("summary"),"aria-describedby":"input-summary-feedback"},model:{value:e.$v.form.summary.$model,callback:function(t){e.$set(e.$v.form.summary,"$model",t)},expression:"$v.form.summary.$model"}}),e.$v.form.summary.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-summary-feedback"}},[e._v("Summary is required.")]),e.$v.form.summary.minLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-summary-feedback"}},[e._v("Must be atleast 10 characters long.")]),e.$v.form.summary.maxLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-summary-feedback"}},[e._v("Must not be longer than 50 characters.")])],1),t("b-form-group",{attrs:{id:"review-comment-group",label:"Review:","label-for":"collection-comment"}},[t("b-form-textarea",{attrs:{id:"review-comment",type:"text",placeholder:"Enter comment...",rows:"3",state:e.validateState("comment"),"aria-describedby":"input-comment-feedback"},model:{value:e.$v.form.comment.$model,callback:function(t){e.$set(e.$v.form.comment,"$model",t)},expression:"$v.form.comment.$model"}}),e.$v.form.comment.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-comment-feedback"}},[e._v("Description is required.")]),e.$v.form.comment.minLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-comment-feedback"}},[e._v("Must be at least 40 characters long.")]),e.$v.form.comment.maxLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-comment-feedback"}},[e._v("Must not be longer than 200 characters.")])],1),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1)],1)},Ce=[],Se={name:"ReviewForm",components:{},props:{movieId:{type:Number},summary:{type:String,default:""},comment:{type:String,default:""},rating:{type:Number,default:1}},data(){return{starsNum:10,form:{summary:"",comment:"",rating:0,userId:-1}}},validations:{form:{summary:{required:q.C1,minLength:(0,q.Ei)(10),maxLength:(0,q.BS)(50)},comment:{required:q.C1,minLength:(0,q.Ei)(50),maxLength:(0,q.BS)(200)}}},computed:{...(0,a.rn)(["user","token"])},methods:{...(0,a.nv)(["addReview"]),resetForm(){this.form={summary:"",comment:"",rating:3,userId:-1,movieId:-1},this.$nextTick((()=>{this.$v.$reset()}))},validateState(e){const{$dirty:t,$error:i}=this.$v.form[e];return t?!i:null},submitReview:function(e){e.preventDefault(),this.$v.form.$anyError||(this.form.userId=this.user.userId,this.form.movieId=this.movieId,this.$socket.emit("review",{review:this.form,token:this.token}),this.resetForm())}},mounted(){this.form.summary=this.summary,this.form.comment=this.comment,this.form.rating=this.rating}},we=Se,Me=(0,c.Z)(we,$e,Ce,!1,null,"17d17ff6",null),Te=Me.exports,xe={name:"Movie",components:{ReviewForm:Te,Header:y},data(){return{movie:null,numStars:10}},filters:{nameAndLastname(e){return e.name+" "+e.lastname}},computed:{...(0,a.rn)(["user"])},methods:{...(0,a.nv)(["getMovie"])},mounted(){this.getMovie(this.$route.params.id).then((e=>{this.movie=e}))}},Ie=xe,Re=(0,c.Z)(Ie,ye,ke,!1,null,"caa6a338",null),Pe=Re.exports,Ee=function(){var e=this,t=e._self._c;return t("div",[e.collection?t("Header",{attrs:{subtitle:e.subtitle+e.collection.label}}):e._e(),t("b-container",[t("b-button",{attrs:{size:"md",variant:"primary"},on:{click:function(t){return e.editCollection()}}},[e._v("Edit this collection")])],1),e.collection?t("b-container",[t("b-table",{attrs:{id:"single-collection",hover:"",items:e.collection.movies,fields:e.fields},scopedSlots:e._u([{key:"cell(title)",fn:function(i){return[t("b-link",{on:{click:function(t){return e.viewMovie(i.item.id)}}},[e._v(e._s(i.item.title))])]}}],null,!1,2734957470)})],1):e._e()],1)},qe=[],Le={name:"SingleCollection",components:{Header:y},data(){return{fields:[{key:"title"},{key:"category.label",label:"Category"},{key:"release_date",label:"Released on"}],subtitle:"Your collection: ",collection:null}},methods:{...(0,a.nv)(["getCollectionById"]),editCollection:function(){this.$router.push({name:"editCollection",params:{id:this.collection.id}})},viewMovie:function(e){this.$router.push({name:"movie",params:{id:e}})}},mounted(){this.getCollectionById(this.$route.params.id).then((e=>{this.collection=e}))}},je=Le,He=(0,c.Z)(je,Ee,qe,!1,null,"bb113c9c",null),Oe=He.exports,Ze=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{subtitle:"Add or remove movies:"}}),t("b-container",[t("b-form",{on:{submit:e.saveChanges}},[t("b-button",{attrs:{size:"md",variant:"primary",type:"submit"}},[e._v("Save changes")])],1)],1),e.moviesCopy.length?t("b-container",[t("b-table",{attrs:{id:"movies-to-add",hover:"",items:e.moviesCopy,fields:e.collectionFields},scopedSlots:e._u([{key:"cell(action)",fn:function(i){return[t("b-button",{attrs:{size:"sm"},on:{click:function(t){return e.removeMovie(i.item.id)}}},[e._v("Remove")])]}}],null,!1,2548652594)})],1):e._e(),t("b-container",{attrs:{fluid:""}},[t("b-form",{on:{submit:e.submitSearch}},[t("b-form-group",{attrs:{id:"serach-input-group",label:"Search:","label-for":"search-input"}},[t("b-form-input",{attrs:{id:"search-input",type:"text",placeholder:"Search movies by title...",required:""},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}})],1),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1),e.moviesSearchResult.length?t("b-container",[t("h3",[e._v("Results:")]),t("b-table",{attrs:{hover:"",items:e.moviesSearchResult,"per-page":e.perPage,"current-page":e.currentPage,fields:e.searchFields},scopedSlots:e._u([{key:"cell(action)",fn:function(i){return[t("b-button",{attrs:{size:"sm",disabled:e.alreadyContained(i.item)},on:{click:function(t){return e.addMovie(i.item)}}},[e._v("Add")])]}}],null,!1,2053770896)}),t("b-pagination",{attrs:{"total-rows":e.moviesSearchResult.length,"per-page":e.perPage},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1):e._e()],1)},Ae=[],Be=(i(6699),{name:"EditCollection",components:{Header:y},data(){return{collection:null,moviesCopy:[],searchInput:"",searchTitle:"",currentPage:1,perPage:10,searchFields:[{key:"title"},{key:"release_date"},{key:"action"}],collectionFields:[{key:"title"},{key:"release_date"},{key:"action"}]}},computed:{...(0,a.rn)(["moviesSearchResult"])},methods:{...(0,a.nv)(["getCollectionById","collectionSave","searchMovies"]),...(0,a.OI)(["resetMovieSearchResult"]),addMovie:function(e){this.moviesCopy.push(e)},alreadyContained:function(e){return!!this.moviesCopy.map((e=>e.id)).includes(e.id)},removeMovie:function(e){this.moviesCopy=this.moviesCopy.filter((t=>t.id!=e))},saveChanges:function(e){e.preventDefault();const t=[],i=this.$route.params.id;this.moviesCopy.forEach((e=>{t.push({movielistsId:i,movieId:e.id})}));const o={list_body:t};this.collectionSave({payload:o,movielistsId:i,movieList:this.moviesCopy}).then((e=>{alert(e.message),this.$router.push({name:"collection",params:{id:i}})}))},submitSearch:function(e){e.preventDefault(),this.searchTitle=this.searchInput,this.searchInput="",this.currentPage=1,this.searchMovies({page:this.currentPage,title:this.searchTitle})}},mounted(){this.getCollectionById(this.$route.params.id).then((e=>{this.collection=e,this.moviesCopy=this.collection.movies})),this.resetMovieSearchResult()}}),Ne=Be,Fe=(0,c.Z)(Ne,Ze,Ae,!1,null,"305d583a",null),De=Fe.exports,ze=function(){var e=this,t=e._self._c;return t("div",[e.celebrity?t("Header",{attrs:{subtitle:e.celebrity.name+" "+e.celebrity.lastname}}):e._e(),t("h2",[e._v("Credits:")]),e.celebrity?t("div",{staticClass:"row"},e._l(e.celebrity.roles,(function(i){return t("div",{key:i.id,staticClass:"col-4"},[t("h3",[e._v("As "+e._s(i.role)+" :")]),e._l(i.movies,(function(i){return t("b-list-group",{key:i.id},[t("b-list-group-item",[t("b-link",{attrs:{to:{name:"movie",params:{id:i.id}}}},[e._v(e._s(i.title))])],1)],1)}))],2)})),0):e._e()],1)},Ge=[],Ue={name:"Celebrity",components:{Header:y},data(){return{celebrity:null}},methods:{...(0,a.nv)(["getCelebrity"])},mounted(){this.getCelebrity(this.$route.params.id).then((e=>{this.celebrity=e}))}},Je=Ue,We=(0,c.Z)(Je,ze,Ge,!1,null,"90a4350a",null),Ve=We.exports,Xe=function(){var e=this,t=e._self._c;return e.mode>0?t("CollectionForm",{attrs:{collectionID:e.collectionId,headerTitle:e.headerTitle,label:e.label,description:e.description}}):e._e()},Ye=[],Ke=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{subtitle:e.headerTitle}}),t("b-container",{attrs:{fluid:""}},[t("b-form",{on:{submit:e.submitCollection}},[t("b-form-group",{attrs:{id:"collection-label-group",label:"Collection label:","label-for":"collection-label"}},[t("b-form-input",{attrs:{id:"collection-label",type:"text",placeholder:"Enter label...",state:e.validateState("label"),"aria-describedby":"input-label-feedback"},model:{value:e.$v.form.label.$model,callback:function(t){e.$set(e.$v.form.label,"$model",t)},expression:"$v.form.label.$model"}}),e.$v.form.label.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-label-feedback"}},[e._v("Label is required.")]),e.$v.form.label.minLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-label-feedback"}},[e._v("Must be atleast 5 characters long.")]),e.$v.form.label.maxLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-label-feedback"}},[e._v("Must not be longer than 20 characters.")])],1),t("b-form-group",{attrs:{id:"collection-description-group",label:"Collection description:","label-for":"collection-description"}},[t("b-form-textarea",{attrs:{id:"collection-description",type:"text",placeholder:"Enter description...",rows:"3",state:e.validateState("description"),"aria-describedby":"input-description-feedback"},model:{value:e.$v.form.description.$model,callback:function(t){e.$set(e.$v.form.description,"$model",t)},expression:"$v.form.description.$model"}}),e.$v.form.description.required?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-description-feedback"}},[e._v("Description is required.")]),e.$v.form.description.minLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-description-feedback"}},[e._v("Must be at least 10 characters long.")]),e.$v.form.description.maxLength?e._e():t("b-form-invalid-feedback",{attrs:{id:"input-description-feedback"}},[e._v("Must not be longer than 60 characters.")])],1),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1)],1)},Qe=[],et={name:"CollectionForm",components:{Header:y},props:{collectionId:{type:Number},headerTitle:{type:String},label:{type:String,default:""},description:{type:String,default:""}},data(){return{form:{label:"",description:"",userId:-1}}},validations:{form:{label:{required:q.C1,minLength:(0,q.Ei)(5),maxLength:(0,q.BS)(20)},description:{required:q.C1,minLength:(0,q.Ei)(10),maxLength:(0,q.BS)(60)}}},computed:{...(0,a.rn)(["user"])},methods:{...(0,a.nv)(["createCollection","editCollection"]),resetForm(){this.form={label:"",description:"",userId:-1},this.$nextTick((()=>{this.$v.$reset()}))},validateState(e){const{$dirty:t,$error:i}=this.$v.form[e];return t?!i:null},submitCollection:function(e){e.preventDefault(),this.$v.form.$anyError||(void 0!==this.$route.params.id?(this.form.userId=this.user.userId,this.editCollection({body:this.form,id:this.$route.params.id}),this.$router.push({name:"userCollections"})):(this.form.userId=this.user.userId,this.createCollection(this.form),this.resetForm()))}},mounted(){this.form.label=this.label,this.form.description=this.description}},tt=et,it=(0,c.Z)(tt,Ke,Qe,!1,null,"17ac82c4",null),ot=it.exports,rt={name:"CreateOrEditCollection",components:{CollectionForm:ot},data(){return{collection:null,collectionId:-1,headerTitle:"",label:"",description:"",mode:0}},methods:{...(0,a.nv)(["getCollectionById"])},mounted(){void 0!==this.$route.params.id?this.getCollectionById(this.$route.params.id).then((e=>{this.collection=e,this.collectionId=this.collection.id,this.headerTitle="Edit collection",this.label=this.collection.label,this.description=this.collection.description,this.mode=2})):(this.headerTitle="Create collection",this.mode=1)}},nt=rt,at=(0,c.Z)(nt,Xe,Ye,!1,null,"2e7f0a9b",null),st=at.exports;o["default"].use(u.Z);const lt=[{path:"/",name:"home",component:S},{path:"/login",name:"login",component:se},{path:"/register",name:"register",component:ve},{path:"/search",name:"searchMovies",component:O},{path:"/trending",name:"trendingMovies",component:V},{path:"/toprated",name:"topRatedMovies",component:te},{path:"/collections",name:"userCollections",meta:{authRequired:!0},component:_e},{path:"/collection/:id",name:"collection",meta:{authRequired:!0},component:Oe},{path:"/collection-form/:id?",name:"collectionForm",meta:{authRequired:!0},component:st},{path:"/collection/:id/edit",name:"editCollection",meta:{authRequired:!0},component:De},{path:"/movie/:id",name:"movie",component:Pe},{path:"/celebrity/:id",name:"celebrity",component:Ve}],ct=new u.Z({mode:"history",base:"/",routes:lt});ct.beforeEach(((e,t,i)=>{if(e.meta.authRequired){const e=localStorage.getItem("token");if(!e)return void i({name:"login"})}i()}));var dt=ct,mt=i(5361);o["default"].use(a.ZP);var ut=new a.ZP.Store({state:{token:"",user:null,trendingMovies:null,topRatedMovies:null,movies:[],celebrities:[],moviesSearchResult:[],userCollections:null,collection:null,editCollection:null},mutations:{setToken(e,t){e.token=t,localStorage.token=t,e.user=JSON.parse(mt.lW.from(t.split(".")[1],"base64"))},removeToken(e){e.token="",localStorage.token="",e.userCollections=null,e.collection=null,e.editCollection=null},setTrendingMovies(e,t){e.trendingMovies=t},setTopRatedMovies(e,t){e.topRatedMovies=t},setMoviesSearchResult(e,t){e.moviesSearchResult=[...t]},resetMovieSearchResult(e){e.moviesSearchResult=[]},addCelebrity(e,t){e.celebrities.push(t)},addMovie(e,t){e.movies.push(t)},addCollection(e,t){e.userCollections.push(t)},editCollection(e,{body:t,colId:i}){const o=e.userCollections.findIndex((e=>e.id==i)),r=e.userCollections[o];r.label=t.label,r.description=t.description,e.userCollections.splice(o,1,r)},removeCollection(e,t){e.userCollections=e.userCollections.filter((e=>e.id!=t))},setUserCollections(e,t){e.userCollections=t},setCollectionMovies(e,{id:t,movies:i}){const o=e.userCollections.findIndex((e=>e.id==t));o>-1&&(e.userCollections[o].movies=i.map((e=>e.movie)))},saveMoviesToCollection(e,{id:t,movies:i}){const o=e.userCollections.findIndex((e=>e.id==t));o>-1&&(e.userCollections[o].movies=i)},addReview(e,t){const i=e.movies.findIndex((e=>e.id==t.movieId));i>-1&&e.movies[i].reviews.push(t)}},actions:{register({commit:e},t){fetch("https://scauthapp.herokuapp.com/api_register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json())).then((t=>e("setToken",t.token)))},login({commit:e},t){fetch("https://scauthapp.herokuapp.com/api_login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json())).then((t=>{t.msg?alert(t.msg):e("setToken",t.token)}))},searchMovies({commit:e},t){fetch(`/api/movies/search?title=${t.title}`,{method:"GET"}).then((e=>e.json())).then((t=>e("setMoviesSearchResult",t)))},getTrendingMovies({commit:e,state:t}){return new Promise(((i,o)=>{t.trendingMovies?i(t.trendingMovies):fetch("/api/movies/trending",{method:"GET"}).then((e=>e.json())).then((t=>{e("setTrendingMovies",t),i(t)}))}))},getTopRatedMovies({commit:e,state:t}){return new Promise(((i,o)=>{t.topRatedMovies?i(t.topRatedMovies):fetch("/api/movies/toprated",{method:"GET"}).then((e=>e.json())).then((t=>{e("setTopRatedMovies",t),i(t)}))}))},getCelebrity({commit:e,state:t},i){return new Promise(((o,r)=>{const n=t.celebrities.filter((e=>e.id==i))[0];n?o(n):fetch(`/api/celebrities/${i}`,{method:"GET"}).then((e=>e.json())).then((t=>{e("addCelebrity",t),o(t)}))}))},getMovie({commit:e,state:t},i){return new Promise(((o,r)=>{const n=t.movies.filter((e=>e.id==i))[0];n?o(n):fetch(`/api/movies/${i}`,{method:"GET"}).then((e=>e.json())).then((t=>{e("addMovie",t),o(t)}))}))},getUserCollections({commit:e,state:t}){return new Promise(((i,o)=>{t.userCollections?i(t.userCollections):fetch("/api/movielists",{method:"GET",headers:{Authorization:`Bearer ${localStorage.token}`}}).then((e=>e.json())).then((t=>{e("setUserCollections",t),i(t)}))}))},createCollection({commit:e},t){fetch("/api/movielists",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.token}`},body:JSON.stringify(t)}).then((t=>{200==t.status?t.json().then((t=>e("addCollection",t))):t.json().then((e=>{alert(e.errors[0].message)}))}))},editCollection({commit:e},t){fetch(`/api/movielists/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.token}`},body:JSON.stringify(t.body)}).then((i=>{200==i.status?(e("editCollection",{body:t.body,colId:t.id}),i.json().then((e=>{alert(e.msg)}))):i.json().then((e=>{alert(e.errors[0].message)}))}))},deleteCollection({commit:e},t){return new Promise(((i,o)=>{fetch(`/api/movielists/${t}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.token}`}}).then((e=>e.json())).then((o=>{e("removeCollection",t),i(o)}))}))},getCollectionById({commit:e,state:t},i){return new Promise(((o,r)=>{const n=t.userCollections.filter((e=>e.id==i))[0];n?n.movies?o(n):fetch(`/api/movielists/${i}/movies`,{method:"GET",headers:{Authorization:`Bearer ${localStorage.token}`}}).then((e=>e.json())).then((r=>{e("setCollectionMovies",{id:i,movies:r}),o(t.userCollections.filter((e=>e.id==i))[0])})):fetch(`/api/movielists/${i}`,{method:"GET",headers:{Authorization:`Bearer ${localStorage.token}`}}).then((e=>e.json())).then((e=>{o(e)}))}))},collectionSave({commit:e},{payload:t,movielistsId:i,movieList:o}){return new Promise(((r,n)=>{fetch(`/api/movielists/${i}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.token}`},body:JSON.stringify(t)}).then((e=>e.json())).then((t=>{e("saveMoviesToCollection",{id:i,movies:o}),r(t)}))}))},socket_review({commit:e},t){const i=JSON.parse(t);e("addReview",i)}},modules:{}}),vt=i(4951),ht=i(9557),pt=i.n(ht),bt=i(2066),ft=i(5996),gt=i(9425);i(7024);o["default"].use(ft.XG7),o["default"].use(gt.A7),o["default"].use(vt.ZP);const _t=(0,bt.ZP)("https://scmainapp.herokuapp.com/");o["default"].use(new(pt())({debug:!1,connection:_t,vuex:{store:ut,actionPrefix:"socket_"}})),o["default"].config.productionTip=!1,new o["default"]({router:dt,store:ut,render:e=>e(m)}).$mount("#app")}},t={};function i(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,i),n.exports}i.m=e,function(){var e=[];i.O=function(t,o,r,n){if(!o){var a=1/0;for(d=0;d<e.length;d++){o=e[d][0],r=e[d][1],n=e[d][2];for(var s=!0,l=0;l<o.length;l++)(!1&n||a>=n)&&Object.keys(i.O).every((function(e){return i.O[e](o[l])}))?o.splice(l--,1):(s=!1,n<a&&(a=n));if(s){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[o,r,n]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,n,a=o[0],s=o[1],l=o[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(r in s)i.o(s,r)&&(i.m[r]=s[r]);if(l)var d=l(i)}for(t&&t(o);c<a.length;c++)n=a[c],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(d)},o=self["webpackChunksc_frontend"]=self["webpackChunksc_frontend"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=i.O(void 0,[998],(function(){return i(504)}));o=i.O(o)})();
//# sourceMappingURL=app.d512679b.js.map