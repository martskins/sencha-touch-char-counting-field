var changeLabelFontColor = function(me){
	var hsv2rgb = function(h, s, v) {
	  // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
		var rgb, i, data = [];
		if (s === 0) {
			rgb = [v,v,v];
		} else {
			h = h / 60;
			i = Math.floor(h);
			data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
			switch(i) {
			  case 0:
				rgb = [v, data[2], data[0]];
				break;
			  case 1:
				rgb = [data[1], v, data[0]];
				break;
			  case 2:
				rgb = [data[0], v, data[2]];
				break;
			  case 3:
				rgb = [data[0], data[1], v];
				break;
			  case 4:
				rgb = [data[2], data[0], v];
				break;
			  default:
				rgb = [v, data[0], data[1]];
				break;
			}
		}
		return '#' + rgb.map(function(x){
			return ("0" + Math.round(x*255).toString(16)).slice(-2);
		}).join('');
	};

	var val = me.getValue().length;

	var charsLeft = me.getMaxLength() - me.getValue().length;
	var h= Math.floor((100 - ((100*val)/me.getMaxLength())) * 120 / 100);
	var s = 1;
	var v = 0.8;
	if(me.up('container').config.gradientCounter == false){
		h = 0;
		s = 0;
		v = 0;
	}
	me.up('container').down('label').setStyle('text-align:right; color:'+hsv2rgb(h,s,v)+'; font-size:'+me.up('container').config.charCounterFontSize+'px;')
	me.up('container').down('label').setHtml(charsLeft+'/'+me.getMaxLength());
}

Ext.define('Ext.ux.CharCountingField',{
	extend:'Ext.Container',
	alias:'widget.charcountingfield',
	config:{
		layout:{
			type:'vbox',
			align:'stretch'
		},
		gradientCounter:true,
		charCounterFontSize:10,
		fieldType:'textareafield',
		items:[] //Add items on initConfig
	},
	initConfig:function(me){
		this.callParent(arguments);
		if(this.config.fieldType == 'textareafield' || this.config.fieldType == 'textfield'){
			this.add({
				xtype:this.config.fieldType,
				width:'100%',
				margin:'0 0 0 0',
				maxLength:150,
				hidden:true,
				listeners:{
					change:function(me, e){
						changeLabelFontColor(me);
					},
					keyup:function(me, e){
						changeLabelFontColor(me);
					}
				}
			});
			this.add({
				xtype:'label',
				height:0,
				name:'charcountlabel',
				align:'right',
				margin:'-20 10 20 0',
				style:'text-align:right',
				html:'150'
			});
			this.down(this.config.fieldType).show();
		}
		if(this.config.maxHeight){
			this.down(this.config.fieldType).setMaxHeight(this.config.maxHeight);
		}
		if(this.config.maxLength){
			this.down(this.config.fieldType).setMaxLength(this.config.maxLength);
		}
		if(this.config.disabled == true){
			this.down(this.config.fieldType).disable();
			this.down('label').hide();
		}
		if(this.config.placeHolder){
			this.down(this.config.fieldType).setPlaceHolder(this.config.placeHolder);
		}
		
	},
	setValue: function(value){
		this.down(this.config.fieldType).setValue(value);
	},
	enable: function(){
		this.callParent(arguments);
		this.down(this.config.fieldType).enable();
		this.down('label').show();
	},
	disable: function(){
		this.callParent(arguments);
		this.down(this.config.fieldType).disable();
		this.down('label').hide();
	},
	getValue: function(){
		return this.down(this.config.fieldType).getValue();
	},
	getRemainingChars: function(){
		return this.maxLength - this.down(this.config.fieldType).getValue().length;
	}
})
