"use strict";function twosCompCircle(e){var a,t,n,o,i,r,s,c,l,u,m,p=8,v={barClassName:"circle-bar",decValueSpanClassName:"dec-value",binValueSpanClassName:"bin-value",strokeOuterFactor:21.33,strokeInnerFactor:25.6,wrapper:void 0,bar:void 0,decValueSpan:void 0,binValueSpan:void 0,positiveColor:"#90ee90",negativeColor:"#ee9090",wordBitsCollection:void 0};if(this.getDecSignedIntervals=function(){return t},this.calculate=function(e){if(e<t.negative.min||e>t.positive.max)return"Unavailable value";i=g(n+e),function e(){o!=i&&(++n>t.positive.max&&(n-=a),h(n),++o==a&&(o=0),f(o),w(b(o)),setTimeout(e,10))}()},a=Math.pow(2,p),t={positive:{min:0,max:(r=a/2)-1},negative:{min:0-r,max:-1}},!Number.isInteger(e.initValue)||e.initValue<t.negative.min||e.initValue>t.positive.max)throw new Error("Initial value is unavailable");if(n=e.initValue,b(o=g(n)),!(v.wrapper=document.getElementsByClassName(e.wrapperClassName)[0]))throw new Error("There is not the wrapper for circle");s=a/Math.PI,c=a/v.strokeOuterFactor,l=a/v.strokeInnerFactor,m='<svg viewBox="0 0 '.concat(u=s+c," ").concat(u,'">'),m+='<circle class="circle-outer" style="stroke-width: '.concat(c,'" cx="').concat(u/2,'" cy="').concat(u/2,'" r="').concat(s/2,'"/>'),m+='<circle class="'.concat(v.barClassName,'" style="stroke-width: ').concat(l,'" cx="').concat(u/2,'" cy="').concat(u/2,'" r="').concat(s/2,'"/>'),m+="</svg>",v.wrapper.innerHTML+=m,v.bar=document.getElementsByClassName(v.barClassName)[0],v.decValueSpan=document.getElementsByClassName(v.decValueSpanClassName)[0],v.binValueSpan=document.getElementsByClassName(v.binValueSpanClassName)[0];for(var d="",C=0;C<p;C++)d+='<span class="word-bit"></span>';function b(e){for(var a=e.toString(2).split("");a.length<p;)a.unshift("0");return a=a.join("")}function g(e){return 0<=e?e:a-Math.abs(e)}function w(e){for(var a=0;a<e.length;a++)v.wordBitsCollection[a].innerHTML=e[a],0==a&&(v.wordBitsCollection[a].style.background="1"==e[0]?v.negativeColor:v.positiveColor)}function f(e){v.bar.style.stroke=0<=e&&e<a/2?v.positiveColor:v.negativeColor,v.bar.style.strokeDasharray="".concat(e," ").concat(a-e)}function h(e){v.decValueSpan.innerHTML=e}v.binValueSpan.innerHTML=d,v.wordBitsCollection=document.getElementsByClassName("word-bit"),f(o),h(n),w(b(o))}