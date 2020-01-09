$(document).ready(function () {
    var temp = 0;
    $('.importe').each(function () {
        var tdTxt = $(this)[0].value;
        if ($(this).hasClass('sumaImportes')) {
            $(this).val(temp.toFixed(2));
            temp = 0;
        } else {
            temp += parseFloat(tdTxt);
        }
    });

    var temp2 = 0
    $('.herramientas').each(function () {
        var tdTxt = $(this)[0].value;
        if ($(this).hasClass('sumaHerramientas')) {
            $(this).val((temp2*0.05).toFixed(2));
            temp2 = 0;
        } else {
            temp2 += parseFloat(tdTxt);
        }
    });

    var temp3 = 0
    $('.indirectos').each(function () {
        var tdTxt = $(this)[0].value;
        if ($(this).hasClass('sumaIndirectos')) {
            $(this).val((temp3*0.1).toFixed(2));
            temp3 = 0;
        } else {
            temp3 += parseFloat(tdTxt);
        }
    });

    var temp4 = 0
    $('.utilidad').each(function () {
        var tdTxt = $(this)[0].value;
        if ($(this).hasClass('sumaUtilidad')) {
            $(this).val((temp4*0.3).toFixed(2));
            temp4 = 0;
        } else {
            temp4 += parseFloat(tdTxt);
        }
    });

    var temp5 = 0
    $('.subtotal').each(function () {
        var tdTxt = $(this)[0].value;
        if ($(this).hasClass('sumaSubtotal')) {
            $(this).val(temp5.toFixed(2))
            temp5 = 0;
        } else {
            temp5 += parseFloat(tdTxt);
        }
    });

    var temp6 = 0
    $('.iva').each(function () {
        var tdTxt = $(this)[0].value;
        if ($(this).hasClass('sumaIva')) {
            $(this).val((temp6*0.16).toFixed(2));
            temp6 = 0;
        } else {
            temp6 += parseFloat(tdTxt);
        }
    });

    var temp7 = 0
    $('.total').each(function () {
        var tdTxt = $(this)[0].value;
        if ($(this).hasClass('sumaTotal')) {
            $(this).val(temp7.toFixed(2));
            temp7 = 0;
        } else {
            temp7 += parseFloat(tdTxt);
        }
    });
});