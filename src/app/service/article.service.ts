import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleI } from '../model/article-i';
import { UrlApi } from '../utils/constants';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  private artUrl = UrlApi.urlApiGestionStock;
  private urlArtAD = UrlApi.urlApiArticleAdmin;



  constructor(private http: HttpClient) { }


  getListArticles() {
    return this.http.get<ArticleI[]>(`${this.urlArtAD}/listArticle`);  ///articles/listArticle
  }

  removeArticle(id: number) {
    return this.http.delete( `${this.urlArtAD}/articles/deleteArticle/${id}` ).subscribe()
  }


  searchPokemonList(term:string):Observable<any>{

    // if(term.length <=1){
    //   return of([])
    // }

    return this.http.get<ArticleI[]>(`${this.urlArtAD}/search/articles?nom=${term}`).pipe(
      tap((response) =>this.log(response)),
      catchError((error)=>this.handleError(error, []))
    )
  }


  private log(response:ArticleI[]|ArticleI|undefined){
    console.table(response)
  }

  private handleError(error:Error, errorValue: []|undefined){
    console.error(error);
    return of(errorValue)
    

  }

  getTotalAmountAndPrice():Observable<any> {
    return this.http.get<any>(`${this.urlArtAD}/totauxAmountPrice`)
  }


  //Ajout d'un article
  addArticle(articleObj:ArticleI) {
    return this.http.post<ArticleI>(`${this.urlArtAD}/addArticle`, articleObj)
  }


  //Recuperer l'article d'abord
  /* getUpdateArticle(id: number):Observable <ArticleI> {
    return id;
  } */
  
  getArticleByID(id: number): Observable<ArticleI> {
    
    return this.http.get<ArticleI>(`${this.urlArtAD}/article/${id}/detail`)
  }

  //Modify Article
  updateArticle(id: number, articleObj: ArticleI) {
    return this.http.put<ArticleI>(`${this.urlArtAD}/updateArticle/${id}/updated`, articleObj)
  }

  



}
