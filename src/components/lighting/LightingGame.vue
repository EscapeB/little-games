<template>
    <div class="lighting">
        <div class="main">
            <svg id="game" width="400" height="400">
                <g v-for="(items, key) in status" :key="key">
                    <g v-for="(i, key2) in items" :key="key2">
                        <defs>
                            <filter :id="key + key2 + ''" :x="2 * r * key2" :y="2 * r * key">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                            </filter>
                        </defs>
                        <circle
                            :r="r * 0.85"
                            :cx="2 * r * key2 + r"
                            :cy="2 * r * key + r"
                            :class="{ on: i, off: !i }"
                            @click="clickNode(key, key2)"
                            :filter="key + key2 + ''"
                        />
                    </g>
                </g>
            </svg>
        </div>
        <table>
            <tr v-for="(items, key) in status" :key="key">
                <td v-for="(i, key2) in items" :key="key2">
                    <span :class="{ true: i, false: !i }">{{ i }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import d3 from 'd3';
import _ from 'lodash';

function initStatus(max: number): boolean[][] {
    const result = [];
    for (let i = 0; i < max; i++) {
        const r = [];
        for (let j = 0; j < max; j++) {
            r.push(false);
        }
        result.push(r);
    }
    return result;
}
@Component
export default class LightingGame extends Vue {
    private MAX_COUNT = 2;
    private status: boolean[][] = [];
    private r: number = 0;
    constructor(props: any) {
        super(props);
    }
    mounted() {
        this.init(this.MAX_COUNT);
    }
    private init(max: number): void {
        this.status = initStatus(this.MAX_COUNT);
        this.r = (400 - this.MAX_COUNT * 5) / this.MAX_COUNT / 2;
    }
    private clickNode(x: number, y: number): void {
        // vue data bind
        const newStatus = _.cloneDeep(this.status);
        let nums = 0;
        for (var i = 0; i < this.MAX_COUNT; i++) {
            for (var j = 0; j < this.MAX_COUNT; j++) {
                if (i == x || j == y) {
                    newStatus[i][j] = !newStatus[i][j];
                }
                if (newStatus[i][j]) {
                    nums++;
                }
            }
        }
        this.status = newStatus;
        if (nums === this.MAX_COUNT * this.MAX_COUNT) {
            alert(`You win at level ${this.MAX_COUNT} !`);
            this.MAX_COUNT++;
            this.init(this.MAX_COUNT);
        }
    }
}
</script>
<style lang="stylus">
.lighting {
  position: relative;

  svg {
    circle {
      cursor: pointer;
    }
  }

  .on {
    fill: rgb(253, 242, 202);
    filter: drop-shadow(-25px 25px 25px rgba(26, 58, 70, 0.7));
  }

  .off {
    fill: #ddd;
  }

  .true {
    color: rgb(154, 215, 95);
  }

  .false {
    color: rgb(200, 0, 0);
  }

  table {
    position: absolute;
    right: 10px;
    top: 50%;
  }
}
</style>
