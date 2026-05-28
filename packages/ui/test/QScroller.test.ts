import { describe, expect, it } from "vitest";

import Plugin, {
  install,
  QDateRangeScroller,
  QDateScroller,
  QDateTimeScroller,
  QScroller,
  QStringScroller,
  QTimeRangeScroller,
  QTimeScroller,
  version,
} from "../src";

describe("QScroller exports", () => {
  it("exports installable scroller components", () => {
    expect(QScroller.name).toBe("QScroller");
    expect(QStringScroller.name).toBe("QStringScroller");
    expect(QTimeScroller.name).toBe("QTimeScroller");
    expect(QTimeRangeScroller.name).toBe("QTimeRangeScroller");
    expect(QDateScroller.name).toBe("QDateScroller");
    expect(QDateRangeScroller.name).toBe("QDateRangeScroller");
    expect(QDateTimeScroller.name).toBe("QDateTimeScroller");
    expect(Plugin.install).toBe(install);
    expect(Plugin.version).toBe(version);
  });
});
