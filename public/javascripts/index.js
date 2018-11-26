$(() => {
  $('#dig').on('click', () => {
    $.get("http://localhost:3000/dig/" + $('#url').val(),
      (data) => {
        $('#text').html('')
        $('#text').append(data)
      });
  })

  $('#lookup').on('click', () => {
    $.get("http://localhost:3000/lookup/" + $('#url').val(),
      (data) => {
        $('#text').html('')
        data.map(server => {
          $('#text').append(`<div>Address: ${server.address} IPv${server.family}</div>`)
        })
      });
  })

  $('#reverse').on('click', () => {
    $.get("http://localhost:3000/reverse/" + $('#url').val(),
      (data) => {
          $('#body').html('')
          data.map(resolve => {
          if(resolve) {
            resolve.data.map(item => {
                $('#body').append(`
                  <tr>
                    <th scope="row">${resolve.rrtype}</th>
                    <td>${$('#url').val()}</td> 
                    <td>${item}</td>
                  </tr>`)
            })
          }
        })
      });
  })
})
