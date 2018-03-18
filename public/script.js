var app = new Vue({
  el: '#app',
  data: {
    items: [],
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
      var maxPage = this.items.length;
      var current = this.currentPage;
      console.log(this.option);
      console.log("current right" + this.currentPage);
      if(this.option === 'next'){
        return this.items.filter(function(item){
          return item.pageNumber === current;
        })
      }
      console.log(this.option);
      if(this.option === 'previous'){
        return this.items.filter(function(item){
          //console.log("previous" + this.currentPage);
          return item.pageNumber === current;
        })
      }
      console.log(this.option);
      console.log("max page" + maxPage);
      return this.items.filter(function(item){
        return item.pageNumber === maxPage - 1;
      })
    },

    leftPages: function() {
      var maxPage = this.items.length;
      var current = this.currentPage;
      console.log("current left" + this.currentPage);
      if(this.option === 'next'){
        return this.items.filter(function(item){
          return item.pageNumber === current - 1;
        })
      }
      if(this.option === 'previous'){
        return this.items.filter(function(item){
          //console.log("previous" + this.currentPage);
          return item.pageNumber === current - 1;
        })
      }
      return this.items.filter(function(item){
        return item.pageNumber === maxPage - 2;
      })
    },

  },

  methods: {

    nextPage: function(){
      this.option = 'next';
      //console.log("current in next" + this.currentPage);
      this.currentPage++;
      //console.log("current in next" + this.currentPage);
      this.maxPage = this.items.length;
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
      this.currentPage = this.items.length;
    },

    addItem: function() {
        axios.post("/api/items", {
  	     text: this.text,
         pageNumber: this.pageNumber,
        }).then(response => {
          	this.text = "";
            this.pageNumber = this.items.length + 1;
            this.currentPage = this.items.length;
            this.maxPage = this.items.length;
            console.log("pageNumber is : " + this.pageNumber);
            console.log("length is : " + this.items.length);
            //console.log(this.items);
          	this.getItems();
          	return true;
        }).catch(err => {
        });
    },

  	getItems: function() {
        axios.get("/api/items").then(response => {
      	this.items = response.data;
      	return true;
        	}).catch(err => {
        });
    },

    deleteItem: function(item) {
      axios.delete("/api/items/" + item.id).then(response => {
	    this.getItems();
	    return true;
      }).catch(err => {
      });
    },

    updatePage: function(item){
      axios.put("/api/items/" + item.id, {
      	       text: item.text,
            }).then(response => {
      	       return true;
            }).catch(err => {
      });
    },

  }
});
