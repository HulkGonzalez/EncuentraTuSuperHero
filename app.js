$(() => {
  const datahero = $("#datahero");
  const hero = $("#hero");
  const inputBuscar = $("#inputBuscar");
  const formBuscar = $("#formBuscar");
  const alerta = $("#alerta")

  $("img.logo").parent().css("text-align", "center");

  formBuscar.on("submit", (e) => {
    e.preventDefault();

    
    console.log(inputBuscar.val());
    const soloNumeros = /^\d+$/;

   
    datahero.html("");
    hero.html("");
    alerta.addClass("d-none");

    if (!soloNumeros.test(inputBuscar.val())){
      return alerta.removeClass("d-none")
      
    }

    $.ajax({
      url: `https://www.superheroapi.com/api.php/3525635500807579/${inputBuscar.val()}`,
      type: "GET",
      dataType: "JSON",
      success(data) {
        console.log(data);

        hero.append(`
                    <section class="card">
                        <div class="row">
                                <div class="col-md-3">
                                    <img src="${data.image.url}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-6">
                                    <div class="card-body">
                                      <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Nombre: ${data.name}</li>
                                        <li class="list-group-item">Conexiones: ${data.connections['group-affiliation']}</li>
                                        <li class="list-group-item">Publicado por: ${data.biography.publisher}</li>
                                        <li class="list-group-item">Ocupacion: ${data.work.occupation}</li>
                                        <li class="list-group-item">Primera Aparicion: ${data.biography['first-appearance']}</li>
                                        <li class="list-group-item">Altura: ${data.appearance.height}</li>
                                        <li class="list-group-item">Peso: ${data.appearance.weight}</li>
                                        <li class="list-group-item">Alianzas: ${data.biography.aliases}</li>
                                      </ul>
                                    </div>
                                </div>
                          </div>
                    </section>
            `);

        const optionsdatahero = {
          animationEnabled: true,
          title: {
            text: "Estadisticas de Poder",
          },
          zoomEnabled: true,
          data: [
            {
              type: "pie",
              showInLegend: true,
              legendText: "{indexLabel}",
              dataPoints: [
                {
                  y:
                    data.powerstats.intelligence !== "null"
                      ? data.powerstats.intelligence
                      : 0,
                  indexLabel: "Intelligence",
                },
                {
                  y:
                    data.powerstats.strength !== "null"
                      ? data.powerstats.strength
                      : 0,
                  indexLabel: "Strength",
                },
                {
                  y:
                    data.powerstats.speed !== "null"
                      ? data.powerstats.speed
                      : 0,
                  indexLabel: "Speed",
                },
                {
                  y:
                    data.powerstats.durability !== "null"
                      ? data.powerstats.durability
                      : 0,
                  indexLabel: "Durability",
                },
                {
                  y:
                    data.powerstats.power !== "null"
                      ? data.powerstats.power
                      : 0,
                  indexLabel: "Power",
                },
                {
                  y:
                    data.powerstats.combat !== "null"
                      ? data.powerstats.combat
                      : 0,
                  indexLabel: "Combat",
                },
              ],
            },
          ],
        };
        datahero.CanvasJSChart(optionsdatahero);
      },
      error(e) {
        console.log(e);
      },
    });
  });
});