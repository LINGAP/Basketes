import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {
  //list = index of Tab: 0->shoppingList; 1->pantrylist
  shoppingList:{[name:string]:{list:number,date:string,selected:boolean,expanding:boolean,tags:Array<String>}}

  constructor() { this.shoppingList={} }

  //add new item from input form
  addNewItem(newitem:string,list:number,date:string='--/--/--',tags:Array<string>=[]){
    if(newitem.trim().length!=0){
      let item={list:list,date:date,selected:false,expanding:true,tags:tags};
      this.shoppingList[newitem.trim()]=item;
    }
  }


  //expand detail or not
  async displayDetail(item){
    item.value.expanding=!item.value.expanding;
 }

  //delete the selected items
  delete(){
    for(var i in this.shoppingList){
      if(this.shoppingList[i].selected){
        delete this.shoppingList[i];
      }
    }
   }

   moveToHistory(){
     for(var key in this.shoppingList){
       if(this.shoppingList[key].selected){
         this.swipe(key,1);
         this.shoppingList[key].date= this.updateDate();
       }
     }
   }


   swipeToHistory(key){
     this.swipe(key,1);
     this.shoppingList[key].date=this.updateDate();
   }

   swipe(key:string,destiList:number){
     this.shoppingList[key].list=destiList;
     this.shoppingList[key].selected=false;
   }
   //helper func to moveToHistory
   updateDate(){
     var now = new Date();
     var updatedDate=(now.getMonth()+1).toString()+'/'+now.getDate().toString()+'/'+now.getFullYear().toString().substring(2);
     return updatedDate;
   }

   moveToShoppingList(){
     for(var key in this.shoppingList){
       if(this.shoppingList[key].selected){
         this.swipe(key,0);
       }
     }
   }

   swipeToshoppingList(key){
     this.swipe(key,0);
   }

   addTag(key,tag){
     this.shoppingList[key].tags.push(tag);
   }

   deleteTag(key,tag){
     var index=this.shoppingList[key].tags.indexOf(tag);
     this.shoppingList[key].tags.splice(index,1);
   }


   changeDate(key,newDate){
      }




}
