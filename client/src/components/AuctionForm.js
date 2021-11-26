import React from 'react'


function AuctionForm(){
    return(
        
            
            <form>
                
                    <div className="form-group">
                        <label for="text">Meno aukcie</label>
                        <input type="text" class="form-control" id="name" placeholder="Meno..."></input>
                    </div>
                    <div className="form-group">
                            <label for="exampleFormControlSelect1">Typ aukcie</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option selected>Vybrať...</option>
                                <option>Nabídková</option>
                                <option>Poptávková</option>
                            </select>
                    </div>
                
                   
                    <div className="form-group">
                            <label for="exampleFormControlSelect1">Pravidlá aukcie</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option selected>Vybrat...</option>
                                <option>Otvorená</option>
                                <option>Zatvorená</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <label for="text">Vyvolávacia cena</label>
                        <input type="text" class="form-control" id="name" placeholder="Cena v €..."></input>
                    </div>
                
                
                    <div className="form-group " >
                        <label for="exampleFormControlTextarea1">Popis zboží/majetku</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="6" placeholder="Zadajte popis..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Pridat fotku</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1"></input>
                    </div>
                
            
            
            
            
            
            
            </form>

        
            
        
        
        
        
    )
}
export default AuctionForm