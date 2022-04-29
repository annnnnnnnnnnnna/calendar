let tate = 500;
let yoko = 800;

function init() {
  let url = new URL(window.location.href);
  let params = url.searchParams;
  let data = params.get('data');
  makeTable();
  if (data != null) {
    load(data);
  } else {
    let d = new Date();
    document.getElementById('y').value = d.getFullYear();
    document.getElementById('m').value = d.getMonth() + 1;
  }
  document.getElementById('month').height = tate + 'px';
  document.getElementById('cal').style.width = yoko + 'px';
  document.getElementById('cal').style.backgroundColor = '#' + document.getElementById('bgColor').value;
  if (params.get('mode') == 'view') {
    document.getElementById('edit').style.display = 'none';
  }
  changeMonth();
  save();
}

function makeTable() {
    makeDisplayCalendar();
    makeEditCalendar();
}

function makeDisplayCalendar() {
    let cal = document.getElementById('cal');
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.id = "month";
    td.style.verticalAlign = "top";
    td.rowSpan = 7;
    td.height = tate + 'px';
    let mDiv = document.createElement("div");
    mDiv.id = 'monthTextArea';
    mDiv.className = "month";
    td.appendChild(mDiv);
    let lDiv = document.createElement("div");
    lDiv.id = 'leftTextArea';
    lDiv.className = "leftText";
    td.appendChild(lDiv);
    tr.appendChild(td);

    for (let wd = 1; wd <= 7; wd++) {
      let td = document.createElement("td");
      td.className = "day";
      let dDiv = document.createElement("div");
      dDiv.id = 'd0' + wd;
      switch (wd) {
        case 1:
          dDiv.className = "day sun hd";
          dDiv.innerHTML = 'SUN';
          break;
        case 2:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'MON';
          break;
        case 3:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'TUE';
          break;
        case 4:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'WED';
          break;
        case 5:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'THU';
          break;
        case 6:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'FRI';
          break;
        case 7:
          dDiv.className = "day sat hd";
          dDiv.innerHTML = 'SAT';
          break;
      }
      td.appendChild(dDiv);
      tr.appendChild(td);
    }
    cal.appendChild(tr);
    for (let w = 1; w <= 6; w++) {
      let tr = document.createElement("tr");
      for (let wd = 1; wd <= 7; wd++) {
          let td = document.createElement("td");
          td.className = "day";
          let dDiv = document.createElement("div");
          dDiv.id = 'd' + w + wd;
          if (wd == 1){ dDiv.className = "date day sun"; } 
          else if (wd == 7) { dDiv.className = "date day sat"; }
          else { dDiv.className = "date day"; }
          td.appendChild(dDiv);
          let rDiv = document.createElement("div");
          rDiv.id = 'r' + w + wd;
          rDiv.className = "remarks";
          td.appendChild(rDiv);
          tr.appendChild(td);
        }
        cal.appendChild(tr);
    }
}
function makeEditCalendar() {
    let editCal = document.getElementById('editCal');
    let tr = document.createElement("tr");
    for (let wd = 1; wd <= 7; wd++) {
      let td = document.createElement("td");
      td.className = "day";
      let dDiv = document.createElement("div");
      dDiv.id = 'dd0' + wd;
      switch (wd) {
        case 1:
          dDiv.className = "day sun hd";
          dDiv.innerHTML = 'SUN';
          break;
        case 2:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'MON';
          break;
        case 3:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'TUE';
          break;
        case 4:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'WED';
          break;
        case 5:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'THU';
          break;
        case 6:
          dDiv.className = "day hd";
          dDiv.innerHTML = 'FRI';
          break;
        case 7:
          dDiv.className = "day sat hd";
          dDiv.innerHTML = 'SAT';
          break;
      }
      td.appendChild(dDiv);
      let sel = createSelect('s0' + wd);
      sel.addEventListener('change', function(){ wdSel(wd); } );
      td.appendChild(sel);
      tr.appendChild(td);
    }
    editCal.appendChild(tr);

    for (let w = 1; w <= 6; w++) {
      let tr = document.createElement("tr");
      for (let wd = 1; wd <= 7; wd++) {
          let td = document.createElement("td");
          let dDiv = document.createElement("div");
          dDiv.id = 'dd' + w + wd;
          if (wd == 1){ dDiv.className = "day sun"; } 
          else if (wd == 7) { dDiv.className = "day sat"; }
          else { dDiv.className = "day"; }
          td.appendChild(dDiv);
          let sel = createSelect('s' + w + wd);
          td.appendChild(sel);
          tr.appendChild(td);
        }
        editCal.appendChild(tr);
    }
}

function createSelect (id) {
   let sel = document.createElement("select");
   sel.id = id;
   let opt = document.createElement("option");
   opt.value = '-';
   opt.innerHTML = '-';
   sel.appendChild(opt);
   for (let item = 1; item <= 5; item++) {
     let opt = document.createElement("option");
     opt.value = item;
     opt.innerHTML = item;
     sel.appendChild(opt);
   }
   return sel;
}

function changeMonth() {
  let y = document.getElementById('y').value;
  let m = document.getElementById('m').value-1;
  let d = new Date(y, m, 1);
  let week = 1;
  let month = '';
  switch (m) {
    case 0: month = 'January'; break;
    case 1: month = 'February'; break;
    case 2: month = 'March'; break;
    case 3: month = 'April'; break;
    case 4: month = 'May'; break;
    case 5: month = 'June'; break;
    case 6: month = 'July'; break;
    case 7: month = 'August'; break;
    case 8: month = 'September'; break;
    case 9: month = 'October'; break;
    case 10: month = 'November'; break;
    case 11: month = 'December'; break;
  }
  document.getElementById('monthTextArea').innerHTML = month + '<br>&nbsp;' + y;
  
  for (let w = 1; w <= 6; w++) {
    for (let wd = 1; wd <= 7; wd++) {
      let elem = document.getElementById('d'+w+wd);
      let elem2 = document.getElementById('dd'+w+wd);
      elem.innerHTML = "";
      elem2.innerHTML = "";
    }
  }
  while (d.getMonth() == m) {
    let day = d.getDay()+1;
    let elem = document.getElementById('d'+week+day);
    let elem2 = document.getElementById('dd'+week+day);
    elem.innerHTML = d.getDate();
    elem2.innerHTML = d.getDate();
    d.setDate(d.getDate()+1);
    if (day == 7) week++;
  }
  apply();
}

function wdSel(wd) {
  let selected = document.getElementById('s0'+wd).selectedIndex;
  for (let w = 1; w <= 6; w++) {
    document.getElementById('s'+w+wd).selectedIndex = selected;
  }
}

function tatePlus() {
  tate += document.getElementById('tateSize').value*1;
  document.getElementById('month').height = tate + 'px';
  save();
}

function tateMinus() {
  tate -= document.getElementById('tateSize').value*1;
  document.getElementById('month').height = tate + 'px';
  save();
}

function yokoPlus() {
  yoko += document.getElementById('yokoSize').value*1;
  document.getElementById('cal').style.width = yoko + 'px';
  save();
}

function yokoMinus() {
  yoko -= document.getElementById('yokoSize').value*1;
  document.getElementById('cal').style.width = yoko + 'px';
  save();
}

function apply() {
  let lDiv = document.getElementById('leftTextArea');
  lDiv.innerHTML = document.getElementById('leftText').value.replaceAll('\n', '<br>');
  lDiv.style.color = '#' + document.getElementById('leftTextColor').value;
  for (let w = 1; w <= 6; w++) {
    for (let wd = 1; wd <= 7; wd++) {
      let dDiv = document.getElementById('d'+w+wd);
      let rDiv = document.getElementById('r'+w+wd);
      let sel = document.getElementById('s'+w+wd);
      if (dDiv.innerHTML == '' || sel.selectedIndex == 0) {
        rDiv.innerHTML = '';
      } else {
        rDiv.innerHTML = document.getElementById('text'+ sel.selectedIndex).value.replaceAll('\n', '<br>');
        rDiv.style.color = '#' + document.getElementById('text'+ sel.selectedIndex + 'Color').value;
      }
      
    }
  }
  save();
}

function load(data) {
  console.log(data);
  let json = JSON.parse(data);
  document.getElementById('y').value = json.y;
  document.getElementById('m').value = json.m;
  tate = json.tate;
  yoko = json.yoko;
  document.getElementById('bgColor').value = json.bgColor;

  document.getElementById('leftText').value = json.leftText;
  document.getElementById('leftTextColor').value = json.leftTextColor;
  document.getElementById('text1').value = json.remarks[0].text;
  document.getElementById('text1Color').value = json.remarks[0].color;
  document.getElementById('text2').value = json.remarks[1].text;
  document.getElementById('text2Color').value = json.remarks[1].color;
  document.getElementById('text3').value = json.remarks[2].text;
  document.getElementById('text3Color').value = json.remarks[2].color;
  document.getElementById('text4').value = json.remarks[3].text;
  document.getElementById('text4Color').value = json.remarks[3].color;
  document.getElementById('text5').value = json.remarks[4].text;
  document.getElementById('text5Color').value = json.remarks[4].color;
  for (let w = 1; w <= 6; w++) {
    for (let wd = 1; wd <= 7; wd++) {
        document.getElementById('s' + w + wd).value = json.data[w-1][wd-1];
    }
  }

}

function save() {
  let json = '{';
  json += '"y":' + document.getElementById('y').value + ',';
  json += '"m":' + document.getElementById('m').value + ',';
  json += '"tate":' + tate + ',';
  json += '"yoko":' + yoko + ',';
  json += '"bgColor":"' + document.getElementById('bgColor').value + '",';
  json += '"leftText":"' + document.getElementById('leftText').value.replaceAll('\n', '\\n') + '",';
  json += '"leftTextColor":"' + document.getElementById('leftTextColor').value + '",';
  json += '"remarks":[';
    json += '{"text":"' + document.getElementById('text1').value.replaceAll('\n', '\\n') + '",';
    json += ' "color":"' + document.getElementById('text1Color').value + '"},';
    json += '{"text":"' + document.getElementById('text2').value.replaceAll('\n', '\\n') + '",';
    json += ' "color":"' + document.getElementById('text2Color').value + '"},';
    json += '{"text":"' + document.getElementById('text3').value.replaceAll('\n', '\\n') + '",';
    json += ' "color":"' + document.getElementById('text3Color').value + '"},';
    json += '{"text":"' + document.getElementById('text4').value.replaceAll('\n', '\\n') + '",';
    json += ' "color":"' + document.getElementById('text4Color').value + '"},';
    json += '{"text":"' + document.getElementById('text5').value.replaceAll('\n', '\\n') + '",';
    json += ' "color":"' + document.getElementById('text5Color').value + '"}';
  json += '],';
  json += '"data":[';
    for (let w = 1; w <= 6; w++) {
      json += '[';
      for (let wd = 1; wd <= 7; wd++) {
        json += '"' + document.getElementById('s' + w + wd).value +'",';
      }
      json += '""],'
    }
    json += '[]]';
  json += '}';
  console.log(json);
  let uri = location.href.replace(/\#.*$/, '').replace(/\?.*$/, '') + '?data=' + json;
  document.getElementById('editLink').href =  encodeURI(uri);
  document.getElementById('editLink').innerHTML =  encodeURI(uri);
  document.getElementById('shareLink').href =  encodeURI(uri + '&mode=view');
  document.getElementById('shareLink').innerHTML =  encodeURI(uri + '&mode=view');
}
