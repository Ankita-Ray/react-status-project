import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
 
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid   ,
   margin:grid,
    background: isDragging ? "#fee6c8" : "#fb6737",
     marginTop:responsiveWidth(0),
      borderWidth:2,borderRadius:5,
      width:responsiveWidth(7.7),
   ...draggableStyle,
  
       
});

const getListStyle = isDraggingOver => ({ 
    padding: 0, 
    width: responsiveWidth(37),
    flexDirection:'row',
    display: 'flex'
}); 
class VerticalDragList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[{label:'Date',aOrd:'asc'},{label:'Client',aOrd:'asc'},{label:'Proj',aOrd:'asc'},{label:'Emp',aOrd:'asc'}],
            alter:[true,true,true,true],
            render:true,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onChange = this.onChange.bind(this);
    }

   async onDragEnd(result) {
        // if item dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        }); 
       localStorage.setItem('dragValue',JSON.stringify(await items));
       }
 async onChange(index){ 
    console.log( await this.state.alter); 

  this.state.alter[index]=await !this.state.alter[index]; 
  let arr=await this.state.items;
  await this.state.alter[index]? (arr[index].aOrd='asc') :(arr[index].aOrd='desc');
 
       await this.setState({render:!this.state.render});
       console.log( await this.state.alter); 
       console.log(await this.state.items);
        localStorage.setItem('dragValue',JSON.stringify(await this.state.items));
  }
 componentDidMount(){
     localStorage.setItem('dragValue',JSON.stringify(this.state.items));
   
     
 }
    render() {
        console.log('hi');
        return (
            <DragDropContext onDragEnd={this.onDragEnd} >
                <Droppable droppableId="droppable" direction='horizontal'   >
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            
                        >
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.label} draggableId={item.label} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                            
                                        >
                                                 <View style={{flexDirection:'row',justifyContent:'center'}}>
                                                     <Text style={{   
                                                                    color:snapshot.isDragging?'#333333': '#fff',
                                                                    fontSize: responsiveFontSize(1),
                                                                    fontWeight:'500', 
                                                                  }}>
                                                                    {item.label} 
                                                     </Text>
                                                     <TouchableOpacity 
                                                     
                                                     onPress={ ()=>this.onChange(index)}>
                                                        <Text style={{   
                                                                        color:snapshot.isDragging?'#333333': '#fff',
                                                                        fontSize: responsiveFontSize(1),
                                                                        fontWeight:'500', 
                                                                    }}
                                                                  
        
                                                        >
                                                        : {item.aOrd.toUpperCase()}
                                                        </Text>
                                                    </TouchableOpacity>
                                                
                                                 </View>  
                                                
                                                  
        
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default VerticalDragList;