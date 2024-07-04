import { ArticleI } from './../../model/article-i';
import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { ArticleService } from '../../service/article.service';
import { CalendarModule } from 'primeng/calendar';

import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap, tap, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserI } from '../../model/user-i';
import { UserService } from '../../service/user.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-dashboard',
  //standalone: true,
  //imports: [CalendarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  titleButton : string = "";
  titleHeader: string = "";
  
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject();


  //ADD ARTICLE
  articleForm: FormGroup = new FormGroup({
    nom: new FormControl(""),
    prix: new FormControl(""),
    qte_dispo: new FormControl(""),
    id_USER: new FormControl("") 
  });

  users: UserI[] = [];
  selectedUserId?: number;

  myArticles: ArticleI[] = [];
  
  //totaux sur les articles
  stockArticles: number=0;
  stockArticlesDispo: number = 0;
  isActive = false;
  totalAmountArticleSold : number = 0;
  totalPriceArticleSold : number = 0.0;
  
  
  //VARIABLE POUR MA RECHERCHE
  searchTerms= new Subject<string>()

  article$!:Observable<any>

  noResultsFound = false;
  

  //CONTEXT POPUP AJOUT MODIF
  selectedArticleId?: number;

  //VARIABLE TO MODIFY
  artiModif:ArticleI | undefined;


  constructor(private userService: UserService, private fb:FormBuilder, private tokserv: TokenService, private articleservice:ArticleService, private router:Router) { }

  ngOnInit() {
    //add User Entity
    this.userService.getAllUser().subscribe((data: any) => {
      this.users = data;
    })

    //Table name
    this.dtOptions = {
      pagingType: 'full_members'
    };

    //Add article
    this.articleForm = this.fb.group({
      id_article: [''],
      nom: ['', Validators.required],
      prix: ['', /*Validators.required*/],
      qte_dispo: ['', /*Validators.required*/],
      id_USER: ['', /*Validators.required*/],
    })

    this.search();
    console.log("ddddddd");
    
    //LISTE DES ARTICLES
    this.loadArticles();

    //RECHERCHER LES ARTICLES 
    this.article$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
      // Vérifiez si le terme de recherche n'est pas vide avant d'effectuer la recherche
      if (term.trim() === '') {
        // Si le terme est vide, retournez un Observable vide
        return of([]);
      }
      return this.articleservice.searchPokemonList(term);
      }),
      tap((results) => {
        this.noResultsFound = results.length === 0;
      })

    );
    
    //Appel methode de calcul pour les totaux
    this.getTotaux()

  }


  //ARTICLE LISTE FUNCTION
  loadArticles() {
    this.articleservice.getListArticles().subscribe((data:ArticleI[]) => {
     
      this.stockArticles = data.length;
      this.stockArticlesDispo = data.filter(i=>i.etat_article ==="ACTIF" ).length;

      this.myArticles = data.filter((r: ArticleI) => r.etat_article === "ACTIF")
      this.dttrigger.next(this.myArticles);
      console.log(this.myArticles);

      //this.totalAmountArticleSold = data.length;
      //this.totalPriceArticleSold = data.length;
      
    });
  }

  
  deconnexion() {
    this.tokserv.removeToken("auth-token","refresh")
  }


  deleteArticle(id: number) {
    // alert("delet article")
    if (id) {
      alert("Voulez-vous supprimer cet article ?");
      this.articleservice.removeArticle(id)
    }
     window.location.reload()
    // console.log(id);
  }

  //Modify and Editing Article

  onActive(id?:number) :number {
    //this.router.navigate(["/admin", id]);
    this.isActive = true;
    if (id !== undefined) {
      console.log('id', id);
      this.titleButton = 'Modifier';
      this.titleHeader = "Modification d'un produit";
      this.selectedArticleId = id;

      this.upArticle(id);
      return id;
      // traitement modification produit
    } else {
      this.titleButton = "Ajouter";
      this.titleHeader = "Ajouter un nouveau produit";
      // traitement ajout produit
      //this.articlSubmit();
      this.selectedArticleId = 0

      return 0;
    }
   // 
  }

  OffActive() {
    this.isActive = false;
    console.log("What offActive value: ",this.isActive);
    
  }
  //LA METHODE RECHERCHE
  search(){
   
    //this.searchTerms.next(term);
    // Debounce search.
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        console.log("ssssearche ", value);
        
        this.articleservice.searchPokemonList(value).subscribe(
          res => {
            this.myArticles = res;
           },
          error => {
            console.log(error);
            
          }
        );
      });
  }


  //Methode de calcul du prix et de la quantité total
  
  getTotaux() {
    this.articleservice.getTotalAmountAndPrice().subscribe((data:any) => {
      
      this.totalAmountArticleSold = data.quantite_vente_article;
      this.totalPriceArticleSold = data.total_vente_article;
      console.log("Total des PRIX: ",data);
      
    })
  }


  //All about creating ARTICLES
  articlSubmit() {
    //alert("go ahead !")
    const articleId = this.selectedArticleId;
    
    console.log("La fonction Onactive", articleId);
    // Appel de onActive() sans paramètre
    if (articleId !== 0) {
        // Si l'ID est différent de 0, cela signifie que nous sommes en mode modification
      alert('Modifier l\'article avec l\'ID : ' + articleId);
      this.reloadMyPage();
    } else {
        // Sinon, nous sommes en mode ajout
      alert('Ajouter un nouvel article');

      this.articleservice.addArticle(this.articleForm.value).subscribe((data) => {
        
        if (data) {
          this.router.navigateByUrl("/admin");
          //this.isActive = true;
        }
        //console.log("Mes articles ", data);
        
      });

      this.reloadMyPage();
    }


  }


  detailArticle(articleId: number) :void {
    //this.router.navigateByUrl("admin/article/detail");
    this.router.navigate(["admin/article/"+articleId+"/detail"])
    
  }

  reloadMyPage(){
    window.location.reload()
  }

  //Modif Article
  upArticle(articleId: number) {
    this.articleservice.getArticleByID(articleId).pipe(
      tap((article: ArticleI) => {
        this.artiModif = article;
        if (article) {
          this.articleForm.patchValue({
            id_article: article.id_article,
            nom: article.nom,
            prix: article.prix,
            qte_dispo: article.qte_dispo

          });
        }
      }),
      catchError(error => {
        console.error('Error fetching article:', error);
        return throwError(error); // Ou gérer l'erreur d'une autre manière
      })
    ).subscribe();
    
  }
  

  //On Edit
  editArticle() {
    
    let formValue = this.articleForm.value;
    console.log(formValue);
    if (formValue.id_article) {
      
      this.articleservice.updateArticle(formValue.id_article, formValue).subscribe((data) => {
        console.log("Article mise à jour avec succès !!", data);
        
      });
    }

    this.reloadMyPage();
    
  }
    
}


