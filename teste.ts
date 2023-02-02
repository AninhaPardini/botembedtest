interface Player {
    id: string,
    name: string,
}

interface Time {
  id?: string,
  name?: String,
  gols: number,
  roleId: string | number, // | significa ou
}

interface Time {
    players?: Player[],
}

type  Championships = {
    id: string,
}

type  Championships = {
    id: string,
}

const times: Array<Time> = [
  {
    gols: 50,
    roleId: "39",
    players: [
        {
            id: "sas",
            name: "nana"
        }
    ]
  }
]

