$(() => {
  const initTable = () => {
    $('#table').html(`
      <thead class="my-thead">
        <tr>
          <th scope="col">TYPE</th>
          <th scope="col">DOMAIN NAME</th>
          <th scope="col">RESOLVE</th>
        </tr>
      </thead>
      <tbody id="body"></tbody>`)
  }

  const createRow = (rrtype, url, record, index) => {
    return `<tr class="row-${index % 2}">
        <th scope="row">${rrtype}</th>
        <td>${url}</td> 
        <td>${getValue(rrtype, record)}</td>
      </tr>`
  }

  const getValue = (rrtype, record) => {
    let value = record
    if (record === 'NO RECORD FOUND') return value
    switch (rrtype) {
      case 'A':
        value = (`<a target="_blank" rel="noopener noreferrer" href='http://${record}'>${record}</a>`)
        break;
      case 'MX':
        value = record.exchange + " with priority " + record.priority
        break;
      case 'SOA':
        value = Object.keys(record).map(key => `<div>${key}: ${record[key]}</div>`).join('')
        break;
      default:
        break;
    }
    return value
  }

  const lookup = async () => {
    const url = $('#url').val()
    const resolves = await $.get("http://localhost:3000/lookup/" + url)
    initTable()
    console.log(resolves);

    let index = 0
    resolves.map(resolve => {
      if (Array.isArray(resolve.records)) {
        resolve.records.map(record => {
          $('#body').append(createRow(resolve.rrtype, url, record, index))
          index++
        })
      } else {
        $('#body').append(createRow(resolve.rrtype, url, resolve.records, index))
        index++
      }
    })
  }

  $('#lookup').on('click', lookup)
  $('#url').keypress(event => {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      lookup()
    }
  });

})
