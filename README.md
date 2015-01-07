# sencha-touch-char-counting-field
Ext.ux.CharCountingField is an extension of Sencha Touch's field to allow the user to display a label counting the chars left to reach the field's max length.

Usage
```javascript
{
	xtype:'charcountingfield',
	maxLength:300, //if none is specified, the field will take "infinite" chars
	maxHeight:200,
	name:'myname',
	placeHolder:'My placeholder',
	fieldType:'textareafield', //either textareafield or textfield. Defaults to textareafield
	gradientCounter: true, //true to use green to red gradient font color in counter, false to use black colored fonts. Defaults to true
	charCounterFontSize: 15 //Counter font size in pixels. Defaults to 10
}
```
![Ext.ux.CharCountingField screenshot](http://imageshack.com/a/img540/9952/DK0CVl.jpg)

```javascript
var myCharCountingField = Ext.create('Ext.ux.CharCountingField');
myCharCountingField.getRemainingChars(); //returns the remaining chars to reach the max
```
