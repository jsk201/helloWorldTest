import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import { Observable} from "rxjs/index"; //Observable
import { fromEvent } from "rxjs/index";  //静态方法
import { filter } from 'rxjs/operators';  //操作符


interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: "breadcrumb",
  template: `
    <ol class="breadcrumb">
      <li><a routerLink="" class="breadcrumb">Home</a></li>
      <li *ngFor="let breadcrumb of breadcrumbs">
        <a [routerLink]="[breadcrumb.url, breadcrumb.params]">{{ breadcrumb.label }}</a>
      </li>
    </ol>
  `
})

export class BredcrumbComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[];

  /**
   * @class DetailComponent
   * @constructor
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];
  }

  /**
   * Let's go!
   *
   * @class DetailComponent
   * @method ngOnInit
   */
  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      ).subscribe(event => {
        let root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
    });




  }

  /**
   * Returns array of IBreadcrumb objects that represent the breadcrumb
   *
   * @class DetailComponent
   * @method getBreadcrumbs
   * @param {ActivateRoute} route
   * @param {string} url
   * @param {IBreadcrumb[]} breadcrumbs
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
