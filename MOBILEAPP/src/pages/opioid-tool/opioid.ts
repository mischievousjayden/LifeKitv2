import {Component} from "@angular/core";

@Component({
    selector: 'page-opioid-tool',
    templateUrl: 'opioid.html'
})
export class OpioidTool {
    about: string = "tool-about";
    
    constructor() {
        this.about = "tool-about";
    }

	
}
