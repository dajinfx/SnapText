
window.onload = function() {
    reloadRecord();
}

document.getElementById('new').addEventListener('click', function(event) {
    window.editor1.setData('');
    var buttonStatus = 0;  //0:none,  1:display
    reloadRecord(buttonStatus);
});

document.getElementById('save').addEventListener('click', function(event) {
    const richTextValue = editor1.getData();
    if(richTextValue.length==0) return;
    SaveEdit();
});

document.getElementById('delete').addEventListener('click', function(event) {
    /*
    localStorage.clear();

    var tableBody   = document.getElementById('localStorageList');
    tableBody .innerHTML = '';
*/

    document.querySelectorAll('#localStorageList tr').forEach(row => {
        // 获取当前行的删除按钮并显示
        const deleteButton = row.querySelector('button');
        if (deleteButton) {
            deleteButton.style.visibility = 'visible';
        }
    });
});


function SaveEdit(){
    var htmlContent = window.editor1.getData();

    var tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    var plainTextContent = tempElement.textContent ;

    var innerText = tempElement.innerText;
    const richTextValue = editor1.getData();

    var getStorageData = JSON.parse(localStorage.getItem('myValue')) || [];

    var timestamp  = new Date().getTime();
    var timestampStr = timestamp.toString();
    var getTime    = getCurrentDateTime(timestamp)

    var newItem = {'id': timestampStr, 'content': plainTextContent, 'richTextValue':richTextValue, 'time': getTime};
    getStorageData.push(newItem);

    localStorage.setItem('myValue', JSON.stringify(getStorageData));

    var tableBody   = document.getElementById('localStorageList');
    tableBody .innerHTML = '';

    getStorageData.reverse();
    getStorageData.forEach(function(item) {
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        var cell2 = document.createElement('td');
        var cell3 = document.createElement('td');
        var cell4 = document.createElement('td');
        var cell5 = document.createElement('button');
        cell5.classList.add('delete-button');

        var contentSub = item.content;
        if(contentSub.length>20)
        {
            contentSub = contentSub.substring(0, 20) + "...";
        }

        cell1.textContent = item.id;
        cell2.textContent = contentSub;
        cell3.textContent = item.richTextValue;
        cell4.textContent = item.time;
        cell5.textContent = "Delete";

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        cell1.style.display = 'none';
        cell3.style.display = 'none';
        cell5.style.visibility = 'hidden';

        tableBody.appendChild(row);
    });

}

function reloadRecord(buttonStatus){
    var getStorageData = JSON.parse(localStorage.getItem('myValue')) || [];
    var tableBody   = document.getElementById('localStorageList');
    tableBody .innerHTML = '';

    getStorageData.reverse();
    getStorageData.forEach(function(item) {
        var row = document.createElement('tr');
        var cell1 = document.createElement('td');
        var cell2 = document.createElement('td');
        var cell3 = document.createElement('td');
        var cell4 = document.createElement('td');
        var cell5 = document.createElement('button');


        var contentSub = item.content;
        if(contentSub.length>20)
        {
            contentSub = contentSub.substring(0, 20) + "...";
        }

        cell1.textContent = item.id;
        cell2.textContent = contentSub;
        cell3.textContent = item.richTextValue;
        cell4.textContent = item.time;
        cell5.textContent = "Delete";
        cell5.classList.add('delete-button');

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        cell1.style.display = 'none';
        cell3.style.display = 'none';

        if(buttonStatus==1)
        {
            cell5.style.visibility = 'visible';
        }
        else
        {
            cell5.style.visibility = 'hidden';
        }

        cell5.style.align = 'right'

        tableBody.appendChild(row);
    });
}

function compareDuplicate(){
    var getStorageData = JSON.parse(localStorage.getItem('myValue')) || [];
    var htmlContent = window.editor1.getData();
}



function deleteLocalStorage(id) {
    // 从localStorage中获取数据并解析为数组
    var getStorageData = JSON.parse(localStorage.getItem('myValue')) || [];
    console.log(getStorageData)
    console.log(id)
    // 查找具有指定id的对象的索引
    const indexToDelete = getStorageData.findIndex(item => item.id.toString() === id.toString());

    // 如果找到了具有指定id的对象，则删除该对象
    if (indexToDelete !== -1) {
        getStorageData.splice(indexToDelete, 1);
    }

    // 将更新后的数组重新存储到localStorage中
    localStorage.setItem('myValue', JSON.stringify(getStorageData));

    var buttonStatus = 1;  //0:none,  1:display
    reloadRecord(buttonStatus);
}

function getCurrentDateTime(timestamp) {
    var date = new Date(timestamp);

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // 月份是从 0 开始的，需要加 1
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    // 将月、日、小时和分钟格式化为两位数，不足补零
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // 拼接成所需格式的字符串
    var formattedDateTime = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes;

    return formattedDateTime;
}
