$(() => {
  const initTable = () => {
    $('#table').html(`
      <thead class="thead-dark">
        <tr>
          <th scope="col">TYPE</th>
          <th scope="col">DOMAIN NAME</th>
          <th scope="col">RESOLVE</th>
        </tr>
      </thead>
      <tbody id="body"></tbody>`)
  }

  const createRow = (rrtype, url, data) => {
    return `<tr>
        <th scope="row">${rrtype}</th>
        <td>${url}</td> 
        <td>${getValue(rrtype, data)}</td>
      </tr>`
  }

  const getValue = (rrtype, data) => {
    let value = data
    switch (rrtype) {
      case 'A':
        value = (`<a target="_blank" rel="noopener noreferrer" href='http://${data}'>${data}</a>`)
        break;
      case 'MX':
        value = data.exchange + " with priority " + data.priority
        break;
      case 'SOA':
        value = Object.keys(data).map(key => `<div>${key}: ${data[key]}</div>`).join('')
        break;
      default:
        break;
    }
    return value
  }

  $('#lookup').on('click', async () => {
    const url = $('#url').val()
    const data = await $.get("http://localhost:3000/lookup/" + url)
    initTable()
    console.log(data);

    data.map(resolve => {
      if (Array.isArray(resolve.data)) {
        resolve.data.map(item => {
          $('#body').append(createRow(resolve.rrtype, url, item))
        })
      } else {
        $('#body').append(createRow(resolve.rrtype, url, resolve.data))
      }
    })
  })

})
