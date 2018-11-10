
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"logo { width: ",[0,230],"; }\n.",[1],"input-view { padding: ",[0,50]," ",[0,50]," ",[0,80]," ",[0,50],"; -webkit-box-pack: end; -webkit-justify-content: flex-end; justify-content: flex-end; }\n.",[1],"input-view .",[1],"label { font-size: ",[0,32],"; color: #808080; }\n.",[1],"input-view .",[1],"input { width: 100%; font-size: ",[0,42],"; margin-bottom: ",[0,30],"; border-bottom: ",[0,5]," solid #E63030; }\n.",[1],"input-view .",[1],"input:-ms-input-placeholder { color: #808080; }\n.",[1],"link-view { font-size: ",[0,32],"; color: #808080; line-height: 2.5em; }\n.",[1],"link-view .",[1],"link { color: #E63030; }\n.",[1],"label { margin-bottom: ",[0,100],"; }\n",],undefined,{path:"./pages/index/index.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/index/index.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      