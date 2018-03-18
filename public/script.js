var app = new Vue({
  el: '#app',
  data: {
    pages: [],
    text: '',
    pageNumber: 0,
    option: 'current',
    maxPage: 0,
    currentPage: 1,
  },

  created: function() {
    this.getItems();
  },

  computed: {

    optionPage: function(){
      var maxPage = this.pages.length;
      var current = this.currentPage;
      console.log(this.option);
      console.log("current right" + this.currentPage);
      if(this.option === 'next'){
        return this.pages.filter(function(page){
          return page.pageNumber === current;
        })
      }
      console.log(this.option);
      if(this.option === 'previous'){
        return this.pages.filter(function(page){
          //console.log("previous" + this.currentPage);
          return page.pageNumber === current;
        })
      }
      console.log(this.option);
      console.log("max page" + maxPage);
      return this.pages.filter(function(page){
        return page.pageNumber === maxPage - 1;
      })
    },

    leftPages: function() {
      var maxPage = this.pages.length;
      var current = this.currentPage;
      console.log("current left" + this.currentPage);
      if(this.option === 'next'){
        return this.pages.filter(function(page){
          return page.pageNumber === current - 1;
        })
      }
      if(this.option === 'previous'){
        return this.pages.filter(function(page){
          //console.log("previous" + this.currentPage);
          return page.pageNumber === current - 1;
        })
      }
      return this.pages.filter(function(page){
        return page.pageNumber === maxPage - 2;
      })
    },

  },

  methods: {

    nextPage: function(){
      this.option = 'next';
      //console.log("current in next" + this.currentPage);
      this.currentPage++;
      //console.log("current in next" + this.currentPage);
      this.maxPage = this.pages.length;
      //console.log("max in next" + this.maxPage);
      if(this.currentPage > this.maxPage){
        this.currentPage = this.maxPage;
      }
    },

    previousPage: function(){
      this.option = 'previous';
      this.currentPage--;
      if(this.currentPage < 0){
        this.currentPage = 0;
      }
    },

    initialCurrent: function(){
      this.currentPage = this.pages.length;
    },

    addItem: function() {
        axios.post("/api/pages", {
  	     text: this.text,
         pageNumber: this.pages.length,
        }).then(response => {
          	this.text = "";
          	this.getItems();
            this.pageNumber = this.pages.length + 1;
            this.currentPage = this.pages.length;
            this.maxPage = this.pages.length;
            console.log("pageNumber is : " + this.pageNumber);
            console.log("length is : " + this.pages.length);
          	return true;
        }).catch(err => {
        });
    },

  	getItems: function() {
        axios.get("/api/pages").then(response => {
      	this.pages = response.data;
      	return true;
        	}).catch(err => {
        });
    },

    deleteItem: function(page) {
      axios.delete("/api/pages/" + page.id).then(response => {
	    this.getItems();
	    return true;
      }).catch(err => {
      });
    },

    updatePage: function(page){
      axios.put("/api/pages/" + page.id, {
      	       text: page.text,
            }).then(response => {
      	       return true;
            }).catch(err => {
      });
    },

  }
});
