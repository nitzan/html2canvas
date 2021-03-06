/*
 * Function to provide border details for an element
 */

html2canvas.prototype.getBorderData = function(el){
     
    var borders = [];
    var _ = this;
    this.each(["top","right","bottom","left"],function(i,borderSide){
        borders.push({
            width: parseInt(_.getCSS(el,'border-'+borderSide+'-width'),10),
            color: _.getCSS(el,'border-'+borderSide+'-color')
        });
    });
            
    return borders;
            
}

html2canvas.prototype.drawBorders = function(el,ctx, bounds,clip){
    
    
    var x = bounds.left;
    var y = bounds.top;
    var w = bounds.width;
    var h = bounds.height;
    
    /*
     *  TODO add support for different border-style's than solid   
     */            
    var borders = this.getBorderData(el);    
    var _ = this;
    
    this.each(borders,function(borderSide,borderData){
        if (borderData.width>0){
            var bx = x,
            by = y,
            bw = w,
            bh = h-(borders[2].width);
            switch(borderSide){
                case 0:
                    // top border
                    bh = borders[0].width;
                    break;
                case 1:
                    // right border
                    bx = x+w-(borders[1].width);
                    bw = borders[1].width;                              
                    break;
                case 2:
                    // bottom border
                    by = (by+h)-(borders[2].width);
                    bh = borders[2].width;
                    break;
                case 3:
                    // left border
                    bw = borders[3].width;  
                    break;
            }		
                   
            var borderBounds = {
                left:bx,
                top:by,
                width: bw,
                height:bh
            };
                   
            if (clip){
               borderBounds = _.clipBounds(borderBounds,clip);
            }
                   
                   
            if (borderBounds.width>0 && borderBounds.height>0){       
            _.newRect(ctx,bx,by,borderBounds.width,borderBounds.height,borderData.color);
            }
                
                    
          
        }
                
    });
    
    return borders;
    
};
