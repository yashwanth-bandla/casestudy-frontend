import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { User } from './user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  // product: Product;
  response: any;
  items: any = [];
  filteredItems: any = [];

  categories: any = [];
  subcategories: any = [];

  completed: boolean = false;
  // i = 1;
  userId: any = 0;
  user: any;
  userName: string;
  responseList: any;
  searchString: string;

  filterResponse: any;
  searchResponse: any;
  searchedList: any = [];

  filterUrl: string = 'http://localhost:8080/products/filter/';
  selectedCategory: string = 'none';
  selectedSubCategory: string = 'none';

  constructor(private http: HttpClient, private router: Router) {
    if (!!localStorage.getItem('token')) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation != null) {
        const state = navigation.extras.state as { userId: number };
        this.userId = state.userId;
      }
      console.log('user id is ' + this.userId);

      if (!this.user) {
        this.http
          .get('http://localhost:8080/getProfile/' + this.userId)
          .subscribe((response) => {
            this.user = response;
            this.userName = this.user.name;
            console.log(this.user);
          });
      }
    }
  }

  ngOnInit() {
    this.http
      .get('http://localhost:8080/products/getAllProducts')
      .subscribe((response) => {
        this.responseList = response;
        console.log(this.responseList);

        for (let productone in this.responseList) {
          this.items.push(this.responseList[productone]);
          this.categories.push(this.responseList[productone].category.category);
          this.categories = [...new Set(this.categories)];
          this.subcategories.push(
            this.responseList[productone].subCategory.name
          );
          this.subcategories = [...new Set(this.subcategories)];
          this.filteredItems.push(this.responseList[productone]);
          console.log(this.responseList[productone]);
        }
      });
  }

  filterProducts() {
    let newFilteredItems: any[] = [];
    // for (let oneitem in this.items) {
    //   if (
    //     this.items[oneitem].category.category == this.selectedCategory &&
    //     this.items[oneitem].subCategory.name == this.selectedSubCategory
    //   ) {
    //     newFilteredItems.push(this.items[oneitem]);
    //   }
    // }
    // this.filteredItems = newFilteredItems;
    // console.log(this.filteredItems);

    this.http
      .get(
        this.filterUrl + this.selectedCategory + '/' + this.selectedSubCategory
      )
      .subscribe((res) => {
        this.filterResponse = res;
        console.log(this.filterResponse);

        for (let item1 in this.filterResponse) {
          console.log(item1);

          newFilteredItems.push(this.filterResponse[item1]);
        }
        this.filteredItems = newFilteredItems;
        console.log(this.filteredItems);
      });
  }
  clearFilters() {
    this.filteredItems = this.items;
    this.selectedCategory = 'none';
    this.selectedSubCategory = 'none';
    this.searchString=""
  }
  searchProducts() {
    this.searchedList = [];
    if (this.searchString.length != 0) {
      this.http
        .get('http://localhost:8080/products/search/' + this.searchString)
        .subscribe((res) => {
          this.searchResponse = res;
          for (let item1 in this.searchResponse) {
            this.searchedList.push(this.searchResponse[item1]);
          }
        });
      this.filteredItems = this.searchedList;
    } else{
      this.filteredItems = this.items;
    }
  }
}
