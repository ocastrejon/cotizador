$(function () {
    
    let id = 0;
    let precio = 0;
// =======================================================================================
        // FUNCION AJAX PASAR DATOS A MODAL
            $(".carroD").on('click', function (e) {
                e.preventDefault();   

                id = e.target.previousElementSibling.value;
                console.log('id Carro: ', id);

                $.ajax({
                    url: 'http://localhost:3333/carros/detalles',
                    method: 'post',
                    data: { id: id},
                    success: (res)=>{
                        if (res){
                            $('#myModal #bolsas_de_aire').val(res[0].bolsas_de_aire);
                            $('#myModal #cilindros').val(res[0].cilindros);
                            $('#myModal #color').val(res[0].color);
                            $('#myModal #frenos').val(res[0].frenos);
                            $('#myModal #marca').val(res[0].marca);
                            $('#myModal #modelo').val(res[0].modelo);
                            $('#myModal #nombre').val(res[0].nombre);
                            $('#myModal #numero_serie').val(res[0].numero_serie);
                            precio = $('#myModal #precio').val(res[0].precio);
                            $('#myModal #statuss').val(res[0].statuss);
                            $('#myModal #transmision').val(res[0].transmision);
                            $('#myModal #version').val(res[0].version);
                        } else {
                            alert('Error');
                        }
                    }
                })
            });



            $('#apartar').on('click', function (e) {
                e.preventDefault();

                $.ajax({
                    url: 'http://localhost:3333/carros/apartar',
                    method: 'post',
                    data: {id: id},
                    success: (res)=>{
                        if (res){
                            // console.log(res);
                            for (let index = 0; index < res.length; index++) {
                                $("#clientesApartar").append('<option>'+ res[index].nombre +'</option>');   
                            }
                        } else {
                            alert('Error');
                        }
                    }
                });
            });


            $('#comprar').on('click', function (e) {
                e.preventDefault();

                $.ajax({
                    url: 'http://localhost:3333/carros/comprar',
                    method: 'post',
                    data: {id: id},
                    success: (res)=>{
                        if (res){
                            // console.log(res);
                            for (let index = 0; index < res.length; index++) {
                                $("#clientesComprar").append('<option>'+ res[index].nombre +'</option>');   
                            }
                        } else {
                            alert('Error');
                        }
                    }
                });
            });



            $('#aplicarApartar').on('click', function(e){
                e.preventDefault();

                console.log(e.target.parentElement.previousElementSibling.childNodes);
                let user = e.target.parentElement.previousElementSibling.childNodes[1].value;
                let confirmar = confirm('Desea apartar el Automóvil?');

                if(confirmar){

                    $.ajax({
                        url: 'http://localhost:3333/carros/apartarCarro',
                        method: 'post',
                        data: {user: user, id: id},
                        success: (res)=>{
                            if (res){
                                console.log(res);
                            } else {
                                alert('Error');
                            }
                        }
                    });
                }

            });


            $('#aplicarComprar').on('click', function(e){
                e.preventDefault();
                let user = e.target.parentElement.previousElementSibling.childNodes[1].value;
                let id_compra = 0;
                precio = precio[0].value;
                // console.log(user, id, precio, id_compra);
                let confirmar = confirm('Desea comprar el Automóvil?');

                if(confirmar){
                
                    $.ajax({
                        url: 'http://localhost:3333/carros/comprarCarro',
                        method: 'post',
                        data: {user: user, id: id, precio: precio, id_compra: id_compra},
                        success: (res)=>{
                            if (res){
                                console.log(res);
                            } else {
                                alert('Error');
                            }
                        }
                    });
                }

            });

    
    
            $(document).ready(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });

});