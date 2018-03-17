var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    pageNumber: 0,
  },

  created: function() {
    this.getItems();
  },
  computed: {

    leftPages: function() {
      var currentPage = this.items.length;
      console.log("length is : " + this.items.length);
      return this.items.filter(function(item){
        console.log("currentPage is : " + currentPage);
        return item.pageNumber === currentPage - 2;
      })
    },

    rightPages: function() {
      var currentPage = this.items.length;
      console.log("length is : " + this.items.length);
      return this.items.filter(function(item){
        console.log("currentPage is : " + currentPage);
        return item.pageNumber === currentPage - 1;
      })
    },
  },

  methods: {
    addItem: function() {
        axios.post("/api/items", {
  	     text: this.text,
         pageNumber: this.pageNumber,
        }).then(response => {
          	this.text = "";
            this.pageNumber = this.items.length + 1;
            //console.log("pageNUmber is : " + this.pageNumber);
            //console.log("length is : " + this.items.length);
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

  }
});
