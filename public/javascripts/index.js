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
        $('#text').html('')
        data.map(resolve => {          
          if(resolve) {
            $('#text').append(`<h3>${resolve.rrtype}</h3>`)
            $('#text').append(`<div>${JSON.stringify(resolve.data, null, 2)}</div>`)
          }
        })
      });
  })
})
