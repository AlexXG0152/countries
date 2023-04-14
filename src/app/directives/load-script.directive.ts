import { Directive, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appLoadScript]',
})
export class LoadScriptDirective implements OnInit {
  @Input('script') param: any;

  ngOnInit() {
    let node = document.createElement('script');
    node.src = this.param;
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
