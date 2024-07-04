import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { ArticleI } from '../../model/article-i';

@Component({
  selector: 'app-article-detail',
  //standalone: true,
  //imports: [],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent {

  article: ArticleI | undefined;

  constructor(private router: Router, private articleservice: ArticleService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.getArticle();
  }

    getArticle(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      
      this.articleservice.getArticleByID(id).subscribe((data) => {
        this.article = data;

        console.log("Tous les details articles sont là", this.article);
        
      })

      
      
    }
  //this.router.navigate(["/admin"]);
  
  goBack() {
    this.router.navigate(["/admin"]);
  }

}
